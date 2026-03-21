import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/auth/isAdmin'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Leden beheer — Burcht ter Cleeff',
  robots: { index: false, follow: false },
}

type Lid = {
  id: string
  lidnummer: string
  naam: string
  email: string
  plaats: string
  betaalwijze: string
  geldig_tot: string
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

export default async function LedenPage() {
  const user = await getAdminUser()
  if (!user) redirect('/inloggen')

  const adminSupabase = createAdminClient()
  const { data: leden } = await adminSupabase
    .from('leden')
    .select('id, lidnummer, naam, email, plaats, betaalwijze, geldig_tot')
    .order('naam', { ascending: true })

  const lijst = (leden ?? []) as Lid[]

  const actief    = lijst.filter(l => getLidStatus(l.geldig_tot) === 'actief').length
  const binnenkort = lijst.filter(l => getLidStatus(l.geldig_tot) === 'binnenkort').length
  const verlopen  = lijst.filter(l => getLidStatus(l.geldig_tot) === 'verlopen').length

  return (
    <>
      <section className="bg-sienna w-full pt-[69px]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <p className="text-white/60 text-body2 font-dm-sans mb-1">Beheer</p>
          <h1 className="text-[42px] leading-[46px] tracking-[-0.03em] md:text-h1 font-dm-sans text-white">
            Leden
          </h1>
        </div>
      </section>

      <div className="bg-white min-h-screen">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">

          {/* Navigatie beheer */}
          <div className="flex gap-4 mb-10">
            <Button as="link" href="/beheer/dagtickets" variant="ghost-sienna" size="sm">
              Dagtickets
            </Button>
            <Button as="link" href="/beheer/leden" variant="sienna" size="sm">
              Leden
            </Button>
          </div>

          {/* Statistieken */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="rounded-2xl border border-grey p-6">
              <p className="text-body3 font-dm-sans text-black/50 mb-1">Totaal leden</p>
              <p className="text-h3 font-dm-sans text-forest">{lijst.length}</p>
            </div>
            <div className="rounded-2xl border border-grey p-6">
              <p className="text-body3 font-dm-sans text-black/50 mb-1">Actief</p>
              <p className="text-h3 font-dm-sans text-forest">{actief}</p>
            </div>
            <div className="rounded-2xl border border-grey p-6">
              <p className="text-body3 font-dm-sans text-black/50 mb-1">Verloopt binnenkort</p>
              <p className="text-h3 font-dm-sans text-caramel">{binnenkort}</p>
            </div>
            <div className="rounded-2xl border border-grey p-6">
              <p className="text-body3 font-dm-sans text-black/50 mb-1">Verlopen</p>
              <p className="text-h3 font-dm-sans text-sienna">{verlopen}</p>
            </div>
          </div>

          {/* Ledenlijst */}
          {lijst.length === 0 ? (
            <div className="rounded-2xl border border-grey p-8 text-center">
              <p className="text-body2 font-dm-sans text-black/50">
                Nog geen leden gevonden.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-grey overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-ivory border-b border-grey">
                <p className="text-body3 font-dm-sans text-black/50">Lidnr.</p>
                <p className="text-body3 font-dm-sans text-black/50">Naam</p>
                <p className="text-body3 font-dm-sans text-black/50">E-mail</p>
                <p className="text-body3 font-dm-sans text-black/50">Betaalwijze</p>
                <p className="text-body3 font-dm-sans text-black/50">Status</p>
                <p className="text-body3 font-dm-sans text-black/50"></p>
              </div>

              {lijst.map((lid, i) => {
                const status = getLidStatus(lid.geldig_tot)
                return (
                  <div
                    key={lid.id}
                    className={`grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr_1fr_1fr_auto] gap-2 md:gap-4 items-center px-6 py-4 ${
                      i < lijst.length - 1 ? 'border-b border-grey' : ''
                    } hover:bg-ivory/50 transition-colors`}
                  >
                    <p className="text-body3 font-dm-sans text-black/50">{lid.lidnummer}</p>
                    <p className="text-body2 font-dm-sans text-black font-medium">{lid.naam}</p>
                    <p className="text-body3 font-dm-sans text-black/70">{lid.email}</p>
                    <p className="text-body3 font-dm-sans text-black/70">{lid.betaalwijze}</p>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-body3 font-dm-sans w-fit ${statusClasses[status]}`}>
                      {statusLabel[status]}
                    </span>
                    <Link
                      href={`/beheer/leden/${lid.id}`}
                      className="text-body3 font-dm-sans text-forest hover:underline whitespace-nowrap"
                    >
                      Bekijk →
                    </Link>
                  </div>
                )
              })}
            </div>
          )}

        </div>
      </div>
    </>
  )
}
