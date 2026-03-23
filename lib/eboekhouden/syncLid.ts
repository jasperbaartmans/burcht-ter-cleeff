import { openSession, closeSession, upsertRelatie, type Relatie } from './client'

type LidInput = {
  lidnummer: string
  naam: string
  email: string
  adres?: string | null
  postcode?: string | null
  plaats?: string | null
  telefoon?: string | null
}

function lidToRelatie(lid: LidInput): Relatie {
  return {
    code:     lid.lidnummer,
    naam:     lid.naam,
    email:    lid.email ?? '',
    adres:    lid.adres ?? '',
    postcode: lid.postcode ?? '',
    plaats:   lid.plaats ?? '',
    telefoon: lid.telefoon ?? '',
  }
}

/**
 * Sync één lid naar e-boekhouden als debiteur.
 * Opent en sluit een eigen sessie — gebruik dit voor auto-sync bij opslaan.
 * Gooit geen error als e-boekhouden onbereikbaar is (logt alleen).
 */
export async function syncLidNaarEboekhouden(lid: LidInput): Promise<void> {
  try {
    const token = await openSession()
    try {
      await upsertRelatie(token, lidToRelatie(lid))
    } finally {
      await closeSession(token)
    }
  } catch (err) {
    console.error('[e-boekhouden] sync lid mislukt:', err)
  }
}

export type BulkSyncResultaat = {
  gesynchroniseerd: number
  overgeslagen: number
  mislukt: number
}

/**
 * Sync alle leden in bulk naar e-boekhouden.
 * Gebruikt één sessie voor alle leden (efficiënter).
 */
export async function syncAlleLedenNaarEboekhouden(
  leden: LidInput[]
): Promise<BulkSyncResultaat> {
  const geldig = leden.filter(l => l.lidnummer && l.naam)
  const overgeslagen = leden.length - geldig.length

  if (geldig.length === 0) {
    return { gesynchroniseerd: 0, overgeslagen, mislukt: 0 }
  }

  const token = await openSession()
  let gesynchroniseerd = 0
  let mislukt = 0

  try {
    for (const lid of geldig) {
      try {
        await upsertRelatie(token, lidToRelatie(lid))
        gesynchroniseerd++
      } catch (err) {
        console.error(`[e-boekhouden] sync lid ${lid.lidnummer} mislukt:`, err)
        mislukt++
      }
    }
  } finally {
    await closeSession(token)
  }

  return { gesynchroniseerd, overgeslagen, mislukt }
}
