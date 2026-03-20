'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Vul hier je vaste Tikkie-links in (Tikkie app → Tikkie aanmaken → bewaar Tikkie).
// Laat een regel leeg ('') als je die nog niet hebt aangemaakt.
const TIKKIE_LINKS: Record<number, string> = {
  2:  'https://tikkie.me/pay/k8g247jcjtddpmvsepja',
  3:  'https://tikkie.me/pay/38u23ju2kptqohqbt262',
  4:  'https://tikkie.me/pay/3n4fg8anjgrin4ds8f20',

}

const PRICE_PER_PERSON = 0.60
const VISITORS = [2, 3, 4]

function formatPrice(n: number) {
  return '€' + (n * PRICE_PER_PERSON).toFixed(2).replace('.', ',')
}

export default function DagticketForm() {
  const router = useRouter()
  const [loading, setLoading] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSelect(persons: number) {
    if (loading !== null) return
    const tikkieUrl = TIKKIE_LINKS[persons]
    if (!tikkieUrl) {
      setError('Deze optie is nog niet beschikbaar. Kies een ander aantal.')
      return
    }

    setLoading(persons)
    setError(null)

    try {
      const res = await fetch('/api/dagticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ persons }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Er ging iets mis. Probeer het opnieuw.')
        setLoading(null)
        return
      }

      // Open Tikkie in nieuw tabblad, navigeer zelf naar de bedankt-pagina met QR
      window.open(tikkieUrl, '_blank', 'noopener,noreferrer')
      router.push(`/bedankt?ticket=${data.ticketId}`)
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.')
      setLoading(null)
    }
  }

  return (
    <div className="max-w-[560px] mx-auto px-6 py-12 md:py-24">

      <h1 className="text-h3 font-dm-sans text-forest text-center mb-3">
        <span className="md:hidden">Dagkaartjes</span>
        <span className="hidden md:inline">Koop nu je dagkaartjes.</span>
      </h1>
      <p className="text-body2 font-dm-sans text-black text-center mb-10 md:mb-12">
        Kies het aantal bezoekers en je wordt direct doorgestuurd naar Tikkie.
      </p>

      <div className="rounded-2xl border border-grey overflow-hidden">
        {VISITORS.map((n, i) => (
          <button
            key={n}
            onClick={() => handleSelect(n)}
            disabled={loading !== null}
            className={`w-full flex items-center justify-between px-6 py-4 hover:bg-forest/5 transition-colors group disabled:opacity-50 disabled:cursor-wait ${
              i < VISITORS.length - 1 ? 'border-b border-grey' : ''
            }`}
          >
            <span className="text-body2 font-dm-sans text-black">
              {n} personen
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sub1 font-dm-sans text-forest font-medium">
                {formatPrice(n)}
              </span>
              {loading === n ? (
                <span className="w-5 h-5 rounded-full border-2 border-forest/30 border-t-forest animate-spin" />
              ) : (
                <span className="text-forest/50 group-hover:text-forest transition-colors text-lg leading-none">
                  →
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-4 text-center text-body3 font-dm-sans text-red-600">{error}</p>
      )}

    </div>
  )
}
