'use client'

import { Symbol, SymbolBadge, type SymbolName } from '@/components/ui/symbols'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-h4 font-dm-sans text-black mb-1">{title}</h2>
      <div className="w-full h-px bg-grey mb-8" />
      {children}
    </section>
  )
}

export default function SymbolsSection() {
  return (
    <Section title="Symbols">
      <div className="space-y-8">

        <div className="p-8 bg-white rounded-2xl">
          <p className="text-body3 font-dm-sans text-black/40 mb-6 uppercase tracking-widest">Plat — forest kleur (speelregels e.d.)</p>
          <div className="flex flex-wrap gap-6">
            {([
              { name: 'warning',     label: 'Waarschuwing' },
              { name: 'trash',       label: 'Afval' },
              { name: 'noDog',       label: 'Geen honden' },
              { name: 'bike',        label: 'Fietsen' },
              { name: 'noSmoke',     label: 'Niet roken' },
              { name: 'toy',         label: 'Knutselen' },
              { name: 'doc',         label: 'Lijst' },
              { name: 'person',      label: 'Persoon' },
              { name: 'shirt',       label: 'Kleding' },
              { name: 'castle',      label: 'Gebouw' },
              { name: 'lamp',        label: 'Lamp' },
              { name: 'picnicTable', label: 'Picknicktafel' },
              { name: 'slide',       label: 'Glijbaan' },
              { name: 'walking',     label: 'Wandelen' },
              { name: 'water',       label: 'Water' },
              { name: 'location',    label: 'Locatie' },
              { name: 'camping',     label: 'Kamperen' },
              { name: 'fitness',     label: 'Fitness' },
              { name: 'house',       label: 'Huis' },
              { name: 'shovel',      label: 'Schep' },
              { name: 'star',        label: 'Ster' },
              { name: 'leaf',        label: 'Blad' },
            ] as { name: SymbolName; label: string }[]).map(({ name, label }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center text-forest">
                  <Symbol name={name} size={28} />
                </div>
                <span className="text-body3 font-dm-sans text-black/40 text-center max-w-[72px]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white rounded-2xl">
          <p className="text-body3 font-dm-sans text-black/40 mb-6 uppercase tracking-widest">In groene cirkel (Quote / VerhuurIntro)</p>
          <div className="flex flex-wrap gap-6">
            {([
              { name: 'star',        label: 'Ster' },
              { name: 'leaf',        label: 'Blad' },
              { name: 'castle',      label: 'Gebouw' },
              { name: 'lamp',        label: 'Lamp' },
              { name: 'picnicTable', label: 'Picknicktafel' },
            ] as { name: SymbolName; label: string }[]).map(({ name, label }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <SymbolBadge name={name} size={28} />
                <span className="text-body3 font-dm-sans text-black/40 text-center max-w-[72px]">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  )
}
