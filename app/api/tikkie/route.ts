import { NextRequest, NextResponse } from 'next/server'

const TIKKIE_BASE_URL = process.env.TIKKIE_SANDBOX === 'true'
  ? 'https://api-sandbox.abnamro.com/v2/tikkie'
  : 'https://api.abnamro.com/v2/tikkie'

const PRICE_PER_PERSON = 0.60 // euro

export async function POST(request: NextRequest) {
  const apiKey = process.env.TIKKIE_API_KEY
  const appToken = process.env.TIKKIE_APP_TOKEN

  if (!apiKey || !appToken) {
    return NextResponse.json(
      { error: 'Tikkie is nog niet geconfigureerd.' },
      { status: 503 }
    )
  }

  const { visitors } = await request.json()

  if (!visitors || typeof visitors !== 'number' || visitors < 2 || visitors > 13) {
    return NextResponse.json({ error: 'Ongeldig aantal bezoekers.' }, { status: 400 })
  }

  const amountInCents = Math.round(visitors * PRICE_PER_PERSON * 100)
  const description = `${visitors} dagkaartje${visitors > 1 ? 's' : ''} — Burcht ter Cleeff`

  // Tikkie links verlopen na 14 dagen
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + 14)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://burcht-ter-cleeff.vercel.app'

  const body = {
    amountInCents,
    currency: 'EUR',
    description,
    expiryDateUtc: expiryDate.toISOString(),
    redirectUrl: `${baseUrl}/bedankt`,
  }

  const res = await fetch(`${TIKKIE_BASE_URL}/paymentrequests`, {
    method: 'POST',
    headers: {
      'API-Key': apiKey,
      'X-App-Token': appToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error('Tikkie API fout:', error)
    return NextResponse.json(
      { error: 'Betaling aanmaken mislukt, probeer het opnieuw.' },
      { status: 502 }
    )
  }

  const data = await res.json()

  return NextResponse.json({ paymentUrl: data.paymentRequestUrl })
}
