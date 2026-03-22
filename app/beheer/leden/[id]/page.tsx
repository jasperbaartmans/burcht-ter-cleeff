import { redirect, notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/auth/isAdmin'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { updateLid } from './actions'

export const metadata = {
  title: 'Lid bewerken — Burcht ter Cleeff',
  robots: { index: false, follow: false },
}

type Lid = {
  id: string
  lidnummer: string
  naam: string
  email: string
  adres: string
  postcode: string
  plaats: string
  telefoon: string
  betaalwijze: string
  geldig_tot: string
  notitie: string | null
  created_at: string
}

function getLidStatus(geldigTot: string): 'actief' | 'binnenkort' | 'verlopen' {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(geldigTot)
  const diffDays = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return 'verlopen'
  if (diffDays <= 60) return 'binnenkort'
  return 'actief'
}

const statusLabel: Record<string, string> = {
  actief: 'Actief',
  binnenkort: 'Verloopt binnenkort',
  verlopen: 'Verlopen',
}

const statusClasses: Record<string, string> = {
  actief: 'bg-forest/10 text-forest',
  binnenkort: 'bg-caramel/10 text-caramel',
  verlopen: 'bg-sienna/10 text-sienna',
}

const betaalwijzen = ['iDEAL', 'Incasso', 'Factuur', 'Contant', 'Gratis', 'Overboeking']

interface Props {
  params: Promise<{ id: string }>
}

export default async function LidDetailPage({ params }: Props) {
  const user = await getAdminUser()
  if (!user) redirect('/beheer')

  const { id } = await params

  const adminSupabase = createAdminClient()
  const { data } = await adminSupabase
    .from('leden')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) notFound()
  const lid = data as Lid

  const status = getLidStatus(lid.geldig_tot)

  const saveAction = async (formData: FormData) => {
    'use server'
    await updateLid(id, formData)
    redirect(`/beheer/leden/${id}?opgeslagen=1`)
  }

  return (
    <>
      <section className="bg-sienna w-full pt-[69px]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <p className="text-white/60 text-body2 font-dm-sans mb-1">
            <Link href="/beheer/leden" className="hover:text-white transition-colors">Leden</Link>
            {' '}/ {lid.lidnummer}
          </p>
          <div className="flex items-end gap-4">
            <h1 className="text-[42px] leading-[46px] tracking-[-0.03em] md:text-h1 font-dm-sans text-white">
              {lid.naam}
            </h1>
            <span className={`mb-1 inline-flex items-center px-3 py-1.5 rounded-full text-body3 font-dm-sans ${statusClasses[status]}`}>
              {statusLabel[status]}
            </span>
          </div>
        </div>
      </section>

      <div className="bg-white min-h-screen">
        <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">

          <div className="flex justify-between items-center mb-10">
            <Button as="link" href="/beheer/leden" variant="ghost-sienna" size="sm">
              ← Terug naar leden
            </Button>
          </div>

          <form action={saveAction} className="space-y-8">

            {/* Persoonsgegevens */}
            <fieldset className="rounded-2xl border border-grey p-6 md:p-8 space-y-5">
              <legend className="text-body3 font-dm-sans text-black/50 px-1">Persoonsgegevens</legend>

              <div>
                <label className="block text-body3 font-dm-sans text-black/60 mb-1.5">Lidnummer</label>
                <p className="text-body2 font-dm-sans text-black/40 bg-ivory rounded-xl px-4 py-3">{lid.lidnummer}</p>
              </div>

              <div>
                <label htmlFor="naam" className="block text-body3 font-dm-sans text-black/60 mb-1.5">Naam gezin</label>
                <input
                  id="naam"
                  name="naam"
                  type="text"
                  defaultValue={lid.naam}
                  required
                  className="w-full text-body2 font-dm-sans text-black bg-white border border-grey rounded-xl px-4 py-3 focus:outline-none focus:border-sienna transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-body3 font-dm-sans text-black/60 mb-1.5">E-mailadres</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={lid.email}
                  required
                  className="w-full text-body2 font-dm-sans text-black bg-white border border-grey rounded-xl px-4 py-3 focus:outline-none focus:border-sienna transition-colors"
                />
              </div>

              <div>
                <label htmlFor="telefoon" className="block text-body3 font-dm-sans text-black/60 mb-1.5">Telefoon</label>
                <input
                  id="telefoon"
                  name="telefoon"
                  type="text"
                  defaultValue={lid.telefoon}
                  className="w-full text-body2 font-dm-sans text-black bg-white border border-grey rounded-xl px-4 py-3 focus:outline-none focus:border-sienna transition-colors"
                />
              </div>
            </fieldset>

            {/* Adres */}
            <fieldset className="rounded-2xl border border-grey p-6 md:p-8 space-y-5">
              <legend className="text-body3 font-dm-sans text-black/50 px-1">Adres</legend>

              <div>
                <label htmlFor="adres" className="block text-body3 font-dm-sans text-black/60 mb-1.5">Straat en huisnummer</label>
                <input
                  id="adres"
                  name="adres"
                  type="text"
                  defaultValue={lid.adres}
                  className="w-full text-body2 font-dm-sans text-black bg-white border border-grey rounded-xl px-4 py-3 focus:outline-none focus:border-sienna transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postcode" className="block text-body3 font-dm-sans text-black/60 mb-1.5">Postcode</label>
                  <input
                    id="postcode"
                    name="postcode"
                    type="text"
                    defaultValue={lid.postcode}
                    className="w-full text-body2 font-dm-sans text-black bg-white border border-grey rounded-xl px-4 py-3 focus:outline-none focus:border-sienna transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="plaats" className="block text-body3 font-dm-sans text-black/60 mb-1.5">Plaats</label>
                  <input
                    id="plaats"
                    name="plaats"
                    type="text"
                    defaultValue={lid.plaats}
                    className="w-full text-body2 font-dm-sans text-black bg-white border border-grey rounded-xl px-4 py-3 focus:outline-none focus:border-sienna transition-colors"
                  />
                </div>
              </div>
            </fieldset>

            {/* Lidmaatschap */}
            <fieldset className="rounded-2xl border border-grey p-6 md:p-8 space-y-5">
              <legend className="text-body3 font-dm-sans text-black/50 px-1">Lidmaatschap</legend>

              <div>
                <label htmlFor="betaalwijze" className="block text-body3 font-dm-sans text-black/60 mb-1.5">Betaalwijze</label>
                <select
                  id="betaalwijze"
                  name="betaalwijze"
                  defaultValue={lid.betaalwijze}
                  className="w-full text-body2 font-dm-sans text-black bg-white border border-grey rounded-xl px-4 py-3 focus:outline-none focus:border-sienna transition-colors"
                >
                  {betaalwijzen.map(bw => (
                    <option key={bw} value={bw}>{bw}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="geldig_tot" className="block text-body3 font-dm-sans text-black/60 mb-1.5">Geldig tot</label>
                <input
                  id="geldig_tot"
                  name="geldig_tot"
                  type="date"
                  defaultValue={lid.geldig_tot}
                  required
                  className="w-full text-body2 font-dm-sans text-black bg-white border border-grey rounded-xl px-4 py-3 focus:outline-none focus:border-sienna transition-colors"
                />
                {status === 'verlopen' && (
                  <p className="mt-2 text-body3 font-dm-sans text-sienna">
                    Lidmaatschap is verlopen. Pas de datum aan om te verlengen.
                  </p>
                )}
                {status === 'binnenkort' && (
                  <p className="mt-2 text-body3 font-dm-sans text-caramel">
                    Lidmaatschap verloopt binnenkort.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="notitie" className="block text-body3 font-dm-sans text-black/60 mb-1.5">Notitie</label>
                <textarea
                  id="notitie"
                  name="notitie"
                  rows={3}
                  defaultValue={lid.notitie ?? ''}
                  placeholder="Optionele notitie voor intern gebruik..."
                  className="w-full text-body2 font-dm-sans text-black bg-white border border-grey rounded-xl px-4 py-3 focus:outline-none focus:border-sienna transition-colors resize-none"
                />
              </div>
            </fieldset>

            <div className="flex justify-end">
              <Button as="button" type="submit" variant="primary" size="md">
                Opslaan
              </Button>
            </div>

          </form>

        </div>
      </div>
    </>
  )
}
