import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Reservering ontvangen — Burcht ter Cleeff',
  robots: { index: false, follow: false },
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('nl-NL', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function CheckIcon() {
  return (
    <span className="w-16 h-16 rounded-full bg-forest flex items-center justify-center mx-auto">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12L10 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default async function ReserveringBevestigdPage({
  searchParams,
}: {
  searchParams: Promise<{ datum?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/inloggen')

  const { datum } = await searchParams
  const dateFormatted = datum && /^\d{4}-\d{2}-\d{2}$/.test(datum)
    ? formatDate(datum)
    : null

  return (
    <main className="min-h-screen bg-ivory flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 flex flex-col items-center gap-6 text-center shadow-sm">
        <CheckIcon />

        <div>
          <h1 className="text-h3 font-dm-sans text-black mb-2">
            Betaling ontvangen
          </h1>
          {dateFormatted && (
            <p className="text-body2 font-dm-sans text-black capitalize">
              {dateFormatted}
            </p>
          )}
          <p className="text-body2 font-dm-sans text-black/60 mt-1">
            09:00 – 13:00 uur
          </p>
        </div>

        <p className="text-body2 font-dm-sans text-black/70">
          Je reservering wordt bevestigd zodra de betaling is verwerkt.
          Je ontvangt een bevestiging per e-mail.
        </p>

        <Link
          href="/mijn-omgeving"
          className="bg-forest text-white rounded-full px-6 py-3 text-body3 font-dm-sans font-medium hover:bg-[#5e7a20] transition-colors"
        >
          Terug naar mijn account
        </Link>
      </div>
    </main>
  )
}
