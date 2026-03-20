import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const { persons } = await request.json()

  if (!persons || typeof persons !== 'number' || persons < 1 || persons > 10) {
    return NextResponse.json({ error: 'Ongeldig aantal personen.' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data: ticket, error } = await supabase
    .from('dagtickets')
    .insert({ persons, valid_date: new Date().toISOString().split('T')[0] })
    .select('id')
    .single()

  if (error || !ticket) {
    console.error('Dagticket insert fout:', error)
    return NextResponse.json({ error: 'Ticket aanmaken mislukt.' }, { status: 500 })
  }

  return NextResponse.json({ ticketId: ticket.id })
}
