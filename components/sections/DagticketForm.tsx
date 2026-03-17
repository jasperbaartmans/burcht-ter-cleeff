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
    <div className="max-w-[560px] mx-auto px-6 py-16 md:py-24">

      {/* Koptekst */}
      <h1 className="text-h3 font-dm-sans text-forest text-center mb-3">
        Koop nu je dagkaartjes.
      </h1>
      <p className="text-body2 font-dm-sans text-black/60 text-center mb-12">
        Selecteer het aantal bezoekers en klik op &lsquo;betalen&rsquo;.
      </p>

      {/* Aantal bezoekers grid */}
      <div className="grid grid-cols-3 border-l border-t border-grey mx-auto w-fit mb-6">
        {VISITORS.map((n) => (
          <button
            key={n}
            onClick={() => setSelected(n)}
            className={`w-[88px] h-[56px] text-sub2 font-dm-sans border-r border-b border-grey transition-colors ${
              selected === n
                ? 'bg-forest text-white'
                : 'bg-white text-forest hover:bg-forest/5'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Totaal */}
      <div className="bg-ivory border border-grey rounded-lg px-6 py-4 flex items-center justify-between mb-8">
        <span className="text-body2 font-dm-sans text-black/60">Totaal</span>
        <span className="text-sub1 font-dm-sans text-forest font-medium">{total}€</span>
      </div>

      {/* Betalen */}
      <div className="flex justify-center">
        <Button variant="primary" size="lg">
          Betalen
        </Button>
      </div>

    </div>
  )
}
