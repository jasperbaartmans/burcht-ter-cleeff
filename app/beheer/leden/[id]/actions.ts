'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { syncLidNaarEboekhouden } from '@/lib/eboekhouden/syncLid'

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

  // Haal lidnummer op voor e-boekhouden sync (lidnummer staat niet in het formulier)
  const { data: lid } = await adminSupabase
    .from('leden')
    .select('lidnummer')
    .eq('id', id)
    .single()

  if (lid?.lidnummer) {
    // Fire-and-forget: sync naar e-boekhouden, blokkeert opslaan niet bij fout
    syncLidNaarEboekhouden({ lidnummer: lid.lidnummer, ...updates })
  }
}
