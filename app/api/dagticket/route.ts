import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const TIKKIE_BASE_URL = process.env.TIKKIE_SANDBOX === 'true'
  ? 'https://api-sandbox.abnamro.com/v2/tikkie'
  : 'https://api.abnamro.com/v2/tikkie'

const PRICE_PER_PERSON = 0.60

export async function POST(request: NextRequest) {
  const { persons } = await request.json()

  if (!persons || typeof persons !== 'number' || persons < 1 || persons > 10) {
    return NextResponse.json({ error: 'Ongeldig aantal personen.' }, { status: 400 })
  }

  // 1. Maak ticket aan in database
  const supabase = createAdminClient()
  const { data: ticket, error: insertError } = await supabase
    .from('dagtickets')
    .insert({ persons, valid_date: new Date().toISOString().split('T')[0] })
    .select('id')
    .single()

  if (insertError || !ticket) {
    console.error('Dagticket insert fout:', insertError)
    return NextResponse.json({ error: 'Ticket aanmaken mislukt.' }, { status: 500 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://burchttercleeff.nl'
  const redirectUrl = `${baseUrl}/bedankt?ticket=${ticket.id}`

  // 2. Probeer Tikkie Business API (dynamische betaallink met terugkeer)
  const apiKey = process.env.TIKKIE_API_KEY
  const appToken = process.env.TIKKIE_APP_TOKEN

  if (apiKey && appToken && apiKey !== 'jouw-api-key') {
    const amountInCents = Math.round(persons * PRICE_PER_PERSON * 100)
    const description = `${persons} dagkaartje${persons > 1 ? 's' : ''} — Burcht ter Cleeff`
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 1)

    const tikkieRes = await fetch(`${TIKKIE_BASE_URL}/paymentrequests`, {
      method: 'POST',
      headers: {
        'API-Key': apiKey,
        'X-App-Token': appToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amountInCents,
        currency: 'EUR',
        description,
        expiryDateUtc: expiryDate.toISOString(),
        redirectUrl,
      }),
    })

    if (tikkieRes.ok) {
      const tikkie = await tikkieRes.json()
      return NextResponse.json({
        ticketId: ticket.id,
        tikkieUrl: tikkie.paymentRequestUrl,
      })
    }

    // Tikkie mislukt — stuur toch door (fallback hieronder)
    console.error('Tikkie API fout bij dagticket, valt terug op statische link')
  }

  // 3. Fallback: geen Tikkie credentials → geef ticket ID terug zonder Tikkie-link
  return NextResponse.json({
    ticketId: ticket.id,
    tikkieUrl: null,
  })
}
