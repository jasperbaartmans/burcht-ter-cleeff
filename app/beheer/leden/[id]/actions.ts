'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'

export async function updateLid(id: string, formData: FormData) {
  const adminSupabase = createAdminClient()

  const updates = {
    naam:        formData.get('naam') as string,
    email:       formData.get('email') as string,
    adres:       formData.get('adres') as string,
    postcode:    formData.get('postcode') as string,
    plaats:      formData.get('plaats') as string,
    telefoon:    formData.get('telefoon') as string,
    betaalwijze: formData.get('betaalwijze') as string,
    geldig_tot:  formData.get('geldig_tot') as string,
    notitie:     (formData.get('notitie') as string) || null,
  }

  const { error } = await adminSupabase
    .from('leden')
    .update(updates)
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/beheer/leden')
  revalidatePath(`/beheer/leden/${id}`)
}
