import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const VERHUUR_PRICE_CENTS = 4000 // €40,00

const TIKKIE_BASE_URL =
  process.env.TIKKIE_SANDBOX === 'true'
    ? 'https://api-sandbox.abnamro.com/v2/tikkie'
    : 'https://api.abnamro.com/v2/tikkie'

export async function POST(request: NextRequest) {
  // 1. Verificeer ingelogde gebruiker
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })
  }

  // 2. Valideer invoer
  const body = await request.json()
  const { date, notes } = body as { date?: string; notes?: string }

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Ongeldige datum.' }, { status: 400 })
  }

  // 3. Datum mag niet in het verleden liggen
  const [y, m, d] = date.split('-').map(Number)
  const selectedDate = new Date(y, m - 1, d)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (selectedDate < today) {
    return NextResponse.json({ error: 'Datum ligt in het verleden.' }, { status: 400 })
  }

  // 4. Check of datum al bezet is (paid of pending)
  const { data: existing } = await supabase
    .from('reservations')
    .select('id')
    .eq('date', date)
    .in('status', ['paid', 'pending'])
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'Deze datum is al gereserveerd.' }, { status: 409 })
  }

  // 5. Maak Tikkie betaalverzoek aan
  const apiKey = process.env.TIKKIE_API_KEY
  const appToken = process.env.TIKKIE_APP_TOKEN

  if (!apiKey || !appToken || apiKey === 'jouw-api-key') {
    return NextResponse.json(
      { error: 'Betaling is nog niet geconfigureerd. Neem contact op.' },
      { status: 503 }
    )
  }

  const formattedDate = selectedDate.toLocaleDateString('nl-NL', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
  const description = `Speeltuin huren ${formattedDate} · Burcht ter Cleeff`

  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + 3) // link geldig 3 dagen

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://burchttercleeff.nl'

  const tikkieRes = await fetch(`${TIKKIE_BASE_URL}/paymentrequests`, {
    method: 'POST',
    headers: {
      'API-Key': apiKey,
      'X-App-Token': appToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amountInCents: VERHUUR_PRICE_CENTS,
      currency: 'EUR',
      description,
      expiryDateUtc: expiryDate.toISOString(),
      redirectUrl: `${baseUrl}/reservering/bevestigd?datum=${date}`,
      notificationUrl: `${baseUrl}/api/webhook/tikkie-verhuur`,
    }),
  })

  if (!tikkieRes.ok) {
    const err = await tikkieRes.text()
    console.error('Tikkie API fout:', err)
    return NextResponse.json({ error: 'Betaling aanmaken mislukt.' }, { status: 502 })
  }

  const tikkie = await tikkieRes.json()

  // 6. Sla reservering op als 'pending'
  const { error: insertError } = await supabase.from('reservations').insert({
    date,
    user_id: user.id,
    status: 'pending',
    notes: notes?.trim() || null,
    tikkie_payment_id: tikkie.paymentRequestToken,
    tikkie_payment_url: tikkie.paymentRequestUrl,
  })

  if (insertError) {
    // Unieke constraint overtreding = race condition, datum net gegrepen
    if (insertError.code === '23505') {
      return NextResponse.json({ error: 'Deze datum is net gereserveerd door iemand anders.' }, { status: 409 })
    }
    console.error('DB insert fout:', insertError)
    return NextResponse.json({ error: 'Reservering opslaan mislukt.' }, { status: 500 })
  }

  return NextResponse.json({ paymentUrl: tikkie.paymentRequestUrl })
}
