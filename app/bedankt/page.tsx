import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import { createAdminClient } from '@/lib/supabase/admin'
import QrDisplay from './QrDisplay'

export const metadata: Metadata = {
  title: 'Betaling ontvangen — Burcht ter Cleeff',
  description: 'Bedankt voor je betaling. Tot ziens bij Burcht ter Cleeff!',
  robots: { index: false, follow: false },
}

const bestedingen = [
  'Onderhoud en vervanging van speeltoestellen',
  'Veiligheidscontroles en keuringen',
  'Groenonderhoud en het bijhouden van het terrein',
  'Sanitaire voorzieningen',
  'Organisatie van activiteiten en evenementen',
]

interface Props {
  searchParams: Promise<{ ticket?: string }>
}

export default async function BedanktPage({ searchParams }: Props) {
  const { ticket: ticketId } = await searchParams

  let ticket: { id: string; persons: number; valid_date: string } | null = null

  if (ticketId) {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('dagtickets')
      .select('id, persons, valid_date')
      .eq('id', ticketId)
      .single()
    ticket = data
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://burchttercleeff.nl'
  const today = new Date().toISOString().split('T')[0]
  const isValid = ticket && ticket.valid_date === today

  return (
    <>
      <section className="bg-forest w-full pt-[69px]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <p className="text-white/60 text-body2 font-dm-sans mb-1">Burcht ter Cleeff</p>
          <h1 className="text-[42px] leading-[46px] tracking-[-0.03em] md:text-h1 font-dm-sans text-white">
            Bedankt!
          </h1>
        </div>
      </section>

      <div className="bg-white min-h-screen">
        <div className="max-w-[560px] mx-auto px-6 py-16 md:py-24">

          <h2 className="text-h3 font-dm-sans text-forest mb-4">
            Je dagkaartjes zijn betaald.
          </h2>
          <p className="text-body2 font-dm-sans text-black mb-10">
            Dank! Dankzij jouw bijdrage houden we Burcht ter Cleeff draaiende voor alle kinderen in de buurt.
            Laat de QR-code hieronder scannen bij de ingang.
          </p>

          {/* QR code */}
          {isValid && ticket ? (
            <div className="mb-10">
              <QrDisplay
                scanUrl={`${baseUrl}/scan/${ticket.id}`}
                persons={ticket.persons}
              />
            </div>
          ) : ticket ? (
            <div className="mb-10 rounded-2xl border border-grey p-6 text-center">
              <p className="text-body2 font-dm-sans text-black/60">
                Dit ticket is niet meer geldig (verlopen).
              </p>
            </div>
          ) : null}

          {/* Bestedingen */}
          <div className="rounded-2xl border border-grey p-6 mb-10">
            <p className="text-body3 font-dm-sans text-black/50 uppercase tracking-wide mb-4">
              Jouw bijdrage gaat naar
            </p>
            <ul className="flex flex-col gap-3">
              {bestedingen.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                      <path d="M1.5 4L3.5 6L6.5 2" stroke="#4a6741" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-body2 font-dm-sans text-black">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button as="link" href="/" variant="primary" size="lg">Terug naar home</Button>
        </div>
      </div>
    </>
  )
}
