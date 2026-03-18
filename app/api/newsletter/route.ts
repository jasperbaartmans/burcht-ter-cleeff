import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const apiKey = process.env.MAILERLITE_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Nieuwsbrief is nog niet geconfigureerd.' },
      { status: 503 }
    )
  }

  const { email } = await request.json()

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Ongeldig e-mailadres.' }, { status: 400 })
  }

  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    console.error('MailerLite fout:', error)
    return NextResponse.json(
      { error: 'Inschrijving mislukt, probeer het opnieuw.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ success: true })
}
