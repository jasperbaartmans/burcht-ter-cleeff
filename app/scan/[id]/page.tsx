import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Ticket controleren — Burcht ter Cleeff',
  robots: { index: false, follow: false },
}

interface Props {
  params: Promise<{ id: string }>
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Amsterdam',
  })
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ScanPage({ params }: Props) {
  const { id } = await params

  const supabase = createAdminClient()
  const { data: ticket } = await supabase
    .from('dagtickets')
    .select('id, persons, valid_date, created_at')
    .eq('id', id)
    .single()

  const today = new Date().toISOString().split('T')[0]
  const isValid = ticket && ticket.valid_date === today

  return (
    <>
      <section className={`w-full pt-[69px] ${isValid ? 'bg-forest' : 'bg-sienna'}`}>
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <p className="text-white/60 text-body2 font-dm-sans mb-1">Burcht ter Cleeff</p>
          <h1 className="text-[42px] leading-[46px] tracking-[-0.03em] md:text-h1 font-dm-sans text-white">
            {!ticket ? 'Onbekend ticket' : isValid ? 'Geldig vandaag' : 'Verlopen'}
          </h1>
        </div>
      </section>

      <div className="bg-white min-h-screen">
        <div className="max-w-[560px] mx-auto px-6 py-16 md:py-24">

          {!ticket ? (
            <>
              <p className="text-body2 font-dm-sans text-black mb-10">
                Dit ticket bestaat niet of is verwijderd.
              </p>
              <Button as="link" href="/" variant="primary" size="lg">Terug naar home</Button>
            </>
          ) : (
            <>
              {/* Status banner */}
              <div className={`rounded-2xl p-6 mb-8 ${isValid ? 'bg-forest/10' : 'bg-red-50'}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isValid ? 'bg-forest' : 'bg-sienna'}`}>
                    {isValid ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8l3.5 3.5L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M4 4l8 8M12 4l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </span>
                  <p className="text-body2 font-dm-sans font-medium text-black">
                    {isValid ? 'Betaald en geldig voor vandaag' : `Verlopen — geldig was ${formatDate(ticket.valid_date)}`}
                  </p>
                </div>
              </div>

              {/* Ticketdetails */}
              <div className="rounded-2xl border border-grey divide-y divide-grey mb-10">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-body3 font-dm-sans text-black/50">Aantal personen</span>
                  <span className="text-body2 font-dm-sans text-black font-medium">
                    {ticket.persons} {ticket.persons === 1 ? 'persoon' : 'personen'}
                  </span>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-body3 font-dm-sans text-black/50">Datum</span>
                  <span className="text-body2 font-dm-sans text-black">{formatDate(ticket.valid_date)}</span>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-body3 font-dm-sans text-black/50">Aangemaakt om</span>
                  <span className="text-body2 font-dm-sans text-black">{formatTime(ticket.created_at)}</span>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  )
}
