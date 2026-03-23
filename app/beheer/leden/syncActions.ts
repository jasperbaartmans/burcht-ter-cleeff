'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/auth/isAdmin'
import { syncAlleLedenNaarEboekhouden } from '@/lib/eboekhouden/syncLid'

export type SyncResult = {
  success: boolean
  synced: number
  skipped: number
  errors: number
  message: string
}

export async function syncLedenToMailerLite(): Promise<SyncResult> {
  const user = await getAdminUser()
  if (!user) throw new Error('Niet ingelogd')

  const apiKey = process.env.MAILERLITE_API_KEY
  if (!apiKey) {
    return {
      success: false,
      synced: 0,
      skipped: 0,
      errors: 0,
      message: 'MailerLite API-sleutel niet geconfigureerd.',
    }
  }

  const adminSupabase = createAdminClient()
  const { data: leden, error } = await adminSupabase
    .from('leden')
    .select('email, naam, lidnummer')
    .order('naam', { ascending: true })

  if (error) {
    return {
      success: false,
      synced: 0,
      skipped: 0,
      errors: 0,
      message: 'Kon leden niet ophalen uit de database.',
    }
  }

  const lijst = leden ?? []
  const geldig = lijst.filter(l => l.email && l.email.includes('@'))
  const skipped = lijst.length - geldig.length

  if (geldig.length === 0) {
    return {
      success: true,
      synced: 0,
      skipped,
      errors: 0,
      message: 'Geen leden met geldig e-mailadres gevonden.',
    }
  }

  const subscribers = geldig.map(lid => ({
    email: lid.email,
    fields: { name: lid.naam },
  }))

  const res = await fetch('https://connect.mailerlite.com/api/subscribers/import', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ subscribers }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    console.error('MailerLite sync fout:', body)
    return {
      success: false,
      synced: 0,
      skipped,
      errors: geldig.length,
      message: 'Sync naar MailerLite mislukt. Controleer de API-sleutel.',
    }
  }

  const parts = [`${geldig.length} leden gesynchroniseerd`]
  if (skipped > 0) parts.push(`${skipped} overgeslagen (geen e-mail)`)

  return {
    success: true,
    synced: geldig.length,
    skipped,
    errors: 0,
    message: parts.join(', ') + '.',
  }
}

export async function syncLedenNaarEboekhouden(): Promise<SyncResult> {
  const user = await getAdminUser()
  if (!user) throw new Error('Niet ingelogd')

  if (!process.env.EBOEKHOUDEN_GEBRUIKERSNAAM) {
    return {
      success: false,
      synced: 0,
      skipped: 0,
      errors: 0,
      message: 'e-Boekhouden credentials niet geconfigureerd.',
    }
  }

  const adminSupabase = createAdminClient()
  const { data: leden, error } = await adminSupabase
    .from('leden')
    .select('lidnummer, naam, email, adres, postcode, plaats, telefoon')
    .order('naam', { ascending: true })

  if (error) {
    return {
      success: false,
      synced: 0,
      skipped: 0,
      errors: 0,
      message: 'Kon leden niet ophalen uit de database.',
    }
  }

  try {
    const resultaat = await syncAlleLedenNaarEboekhouden(leden ?? [])

    const delen: string[] = [`${resultaat.gesynchroniseerd} leden gesynchroniseerd`]
    if (resultaat.overgeslagen > 0) delen.push(`${resultaat.overgeslagen} overgeslagen`)
    if (resultaat.mislukt > 0) delen.push(`${resultaat.mislukt} mislukt`)

    return {
      success: resultaat.mislukt === 0,
      synced: resultaat.gesynchroniseerd,
      skipped: resultaat.overgeslagen,
      errors: resultaat.mislukt,
      message: delen.join(', ') + '.',
    }
  } catch (err) {
    console.error('[e-boekhouden] bulk sync fout:', err)
    return {
      success: false,
      synced: 0,
      skipped: 0,
      errors: 0,
      message: err instanceof Error ? err.message : 'Verbinding met e-boekhouden mislukt.',
    }
  }
}
