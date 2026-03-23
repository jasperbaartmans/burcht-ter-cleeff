import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

/**
 * Geeft terug of vandaag een actieve verhuurafspraak heeft.
 * Openbaar endpoint — geeft alleen een boolean terug, geen persoonsgegevens.
 */
export async function GET() {
  const today = new Date().toISOString().split('T')[0]

  const adminSupabase = createAdminClient()
  const { data } = await adminSupabase
    .from('reservations')
    .select('id')
    .eq('date', today)
    .in('status', ['paid', 'confirmed'])
    .maybeSingle()

  return NextResponse.json({ isRentalDay: !!data }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
