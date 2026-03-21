import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/auth/isAdmin'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Dagtickets beheer — Burcht ter Cleeff',
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: Promise<{ datum?: string }>
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Amsterdam',
  })
}

function formatDateLabel(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function DagticketsPage({ searchParams }: Props) {
  const user = await getAdminUser()
  if (!user) redirect('/inloggen')

  const params = await searchParams
  const today = new Date().toISOString().split('T')[0]
  const datum = params.datum ?? today

  const adminSupabase = createAdminClient()
  const { data: tickets } = await adminSupabase
    .from('dagtickets')
    .select('id, persons, valid_date, created_at')
    .eq('valid_date', datum)
    .order('created_at', { ascending: false })

  const totalPersons = tickets?.reduce((sum, t) => sum + t.persons, 0) ?? 0
  const count = tickets?.length ?? 0

  // Vorige en volgende dag
  const d = new Date(datum)
  d.setDate(d.getDate() - 1)
  const prevDay = d.toISOString().split('T')[0]
  d.setDate(d.getDate() + 2)
  const nextDay = d.toISOString().split('T')[0]

  return (
    <>
      <section className="bg-forest w-full pt-[69px]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <p className="text-white/60 text-body2 font-dm-sans mb-1">Beheer</p>
          <h1 className="text-[42px] leading-[46px] tracking-[-0.03em] md:text-h1 font-dm-sans text-white">
            Dagtickets
          </h1>
        </div>
      </section>

      <div className="bg-white min-h-screen">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-16 md:py-24">

          {/* Navigatie beheer */}
          <div className="flex gap-4 mb-10">
            <Button as="link" href="/beheer/dagtickets" variant="primary" size="sm">
              Dagtickets
            </Button>
            <Button as="link" href="/beheer/leden" variant="ghost" size="sm">
              Leden
            </Button>
          </div>

          {/* Datumnavigatie */}
          <div className="flex items-center justify-between mb-8">
            <Button as="link" href={`/beheer/dagtickets?datum=${prevDay}`} variant="ghost" size="sm">
              ← Vorige dag
            </Button>
            <div className="text-center">
              <p className="text-body2 font-dm-sans text-black font-medium">
                {formatDateLabel(datum)}
              </p>
              {datum !== today && (
                <Button as="link" href="/beheer/dagtickets" variant="text-arrow" size="sm">
                  Terug naar vandaag
                </Button>
              )}
            </div>
            <Button as="link" href={`/beheer/dagtickets?datum=${nextDay}`} variant="ghost" size="sm">
              Volgende dag →
            </Button>
          </div>

          {/* Samenvatting */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="rounded-2xl border border-grey p-6">
              <p className="text-body3 font-dm-sans text-black/50 mb-1">Tickets verkocht</p>
              <p className="text-h3 font-dm-sans text-forest">{count}</p>
            </div>
            <div className="rounded-2xl border border-grey p-6">
              <p className="text-body3 font-dm-sans text-black/50 mb-1">Totaal personen</p>
              <p className="text-h3 font-dm-sans text-forest">{totalPersons}</p>
            </div>
          </div>

          {/* Ticketlijst */}
          {count === 0 ? (
            <div className="rounded-2xl border border-grey p-8 text-center">
              <p className="text-body2 font-dm-sans text-black/50">
                Geen dagtickets verkocht {datum === today ? 'vandaag' : 'op deze dag'}.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-grey overflow-hidden">
              {tickets!.map((ticket, i) => (
                <div
                  key={ticket.id}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i < count - 1 ? 'border-b border-grey' : ''
                  }`}
                >
                  <div>
                    <p className="text-body2 font-dm-sans text-black">
                      {ticket.persons} {ticket.persons === 1 ? 'persoon' : 'personen'}
                    </p>
                    <p className="text-body3 font-dm-sans text-black/50">
                      Aangemaakt om {formatTime(ticket.created_at)}
                    </p>
                  </div>
                  <a
                    href={`/scan/${ticket.id}`}
                    className="text-body3 font-dm-sans text-forest hover:underline"
                  >
                    Scan →
                  </a>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  )
}
