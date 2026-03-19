import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Tikkie stuurt een POST-notificatie naar deze URL zodra een betaling
 * is afgerond. De service-role client bypassed RLS zodat we de status
 * kunnen bijwerken ongeacht welke gebruiker de reservering heeft aangemaakt.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldig verzoek.' }, { status: 400 })
  }

  const paymentRequestToken = body.paymentRequestToken as string | undefined

  if (!paymentRequestToken) {
    return NextResponse.json({ error: 'Geen paymentRequestToken.' }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { error } = await supabase
    .from('reservations')
    .update({ status: 'paid' })
    .eq('tikkie_payment_id', paymentRequestToken)
    .eq('status', 'pending') // alleen 'pending' → 'paid', nooit terugzetten

  if (error) {
    console.error('Tikkie-verhuur webhook DB fout:', error)
    return NextResponse.json({ error: 'Update mislukt.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
