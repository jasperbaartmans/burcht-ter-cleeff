'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

// Prijs per bezoeker — wordt gekoppeld aan Tikkie voor stichtingen
const PRICE_PER_PERSON = 0.60

const VISITORS = Array.from({ length: 12 }, (_, i) => i + 2) // 2 t/m 13

export default function DagticketForm() {
  const [selected, setSelected] = useState(2)

  const total = (selected * PRICE_PER_PERSON).toFixed(2).replace('.', ',')

  return (
    <div className="max-w-[560px] mx-auto px-6 py-12 md:py-24">

      {/* Koptekst — mobiel: "Dagkaartjes", desktop: volledige zin */}
      <h1 className="text-h3 font-dm-sans text-forest text-center mb-3">
        <span className="md:hidden">Dagkaartjes</span>
        <span className="hidden md:inline">Koop nu je dagkaartjes.</span>
      </h1>
      <p className="text-body2 font-dm-sans text-black/60 text-center mb-10 md:mb-12">
        Selecteer het aantal bezoekers en klik op &lsquo;betalen&rsquo;.
      </p>

      {/* Aantal bezoekers grid
          Mobiel: rounded container met overflow-hidden, cellen vullen breedte
          Desktop: grid met border-l/border-t op container, vaste celgroottes */}
      <div className="rounded-2xl border border-grey overflow-hidden md:rounded-none md:border-0 md:overflow-visible w-full mb-6">
        <div className="grid grid-cols-3 md:border-l md:border-t md:border-grey md:w-fit md:mx-auto">
          {VISITORS.map((n) => (
            <button
              key={n}
              onClick={() => setSelected(n)}
              className={`h-16 md:w-[88px] md:h-[56px] text-sub2 font-dm-sans border-b border-r border-grey transition-colors ${
                selected === n
                  ? 'bg-forest text-white'
                  : 'bg-white text-forest hover:bg-forest/5'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Totaal */}
      <div className="bg-ivory border border-grey rounded-lg px-6 py-4 flex items-center justify-between mb-8">
        <span className="text-body2 font-dm-sans text-black/60">Totaal</span>
        <span className="text-sub1 font-dm-sans text-forest font-medium">{total}€</span>
      </div>

      {/* Betalen — mobiel full-width, desktop auto */}
      <div className="flex justify-center">
        <Button variant="primary" size="lg" className="w-full md:w-auto">
          Betalen
        </Button>
      </div>

    </div>
  )
}
