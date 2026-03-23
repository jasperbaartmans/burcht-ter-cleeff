'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/auth/isAdmin'
import { revalidatePath } from 'next/cache'

export async function updateReservation(
  id: string,
  status: string,
  adminNotes: string,
) {
  const user = await getAdminUser()
  if (!user) throw new Error('Niet geautoriseerd')

  const adminSupabase = createAdminClient()
  const { error } = await adminSupabase
    .from('reservations')
    .update({ status, admin_notes: adminNotes.trim() || null })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/beheer/verhuur')
}
