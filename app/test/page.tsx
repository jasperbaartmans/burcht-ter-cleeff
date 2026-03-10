import Button from '@/components/ui/Button'
import StatusBadge from '@/components/ui/StatusBadge'

export const metadata = {
  title: 'Component Test — Burcht ter Cleeff',
}

export default function TestPage() {
  return (
    <div className="min-h-screen bg-ivory py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-16">

        <header>
          <h1 className="text-h2 font-walsheim text-black mb-2">Component Test</h1>
          <p className="text-body2 font-walsheim text-black/60">
            Overzicht van alle UI-componenten voor Fase 1.
          </p>
        </header>

        {/* ── Buttons ── */}
        <section className="space-y-8">
          <h2 className="text-h3 font-walsheim text-black border-b border-grey pb-3">
            Button Variants
          </h2>

          {/* Primary */}
          <div className="space-y-3">
            <p className="text-body3 font-helvetica text-black/50 uppercase tracking-wider">Primary</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="sm">Koop een kaartje</Button>
              <Button variant="primary" size="md">Koop een kaartje</Button>
              <Button variant="primary" size="lg">Koop een kaartje</Button>
            </div>
          </div>

          {/* Ghost */}
          <div className="space-y-3">
            <p className="text-body3 font-helvetica text-black/50 uppercase tracking-wider">Ghost</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="ghost" size="sm">Meer informatie</Button>
              <Button variant="ghost" size="md">Meer informatie</Button>
              <Button variant="ghost" size="lg">Meer informatie</Button>
            </div>
          </div>

          {/* Arrow */}
          <div className="space-y-3">
            <p className="text-body3 font-helvetica text-black/50 uppercase tracking-wider">Arrow (cirkel)</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="arrow" size="sm" aria-label="Volgende" />
              <Button variant="arrow" size="md" aria-label="Volgende" />
              <Button variant="arrow" size="lg" aria-label="Volgende" />
            </div>
          </div>

          {/* Text-arrow */}
          <div className="space-y-3">
            <p className="text-body3 font-helvetica text-black/50 uppercase tracking-wider">Text-arrow</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="text-arrow">Bekijk alle activiteiten</Button>
              <Button variant="text-arrow">Verhuurmogelijkheden</Button>
            </div>
          </div>

          {/* Caramel */}
          <div className="space-y-3">
            <p className="text-body3 font-helvetica text-black/50 uppercase tracking-wider">Caramel</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="caramel" size="sm">Reserveer nu</Button>
              <Button variant="caramel" size="md">Reserveer nu</Button>
              <Button variant="caramel" size="lg">Reserveer nu</Button>
            </div>
          </div>

          {/* Sienna */}
          <div className="space-y-3 bg-sienna rounded-2xl p-6">
            <p className="text-body3 font-helvetica text-white/60 uppercase tracking-wider">Sienna (footer context)</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="sienna" size="sm">Neem contact op</Button>
              <Button variant="sienna" size="md">Neem contact op</Button>
              <Button variant="sienna" size="lg">Neem contact op</Button>
            </div>
          </div>

          {/* As link */}
          <div className="space-y-3">
            <p className="text-body3 font-helvetica text-black/50 uppercase tracking-wider">As Link</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button as="link" href="/verhuur" variant="primary">Bekijk verhuur</Button>
              <Button as="link" href="/contact" variant="ghost">Contact opnemen</Button>
              <Button as="link" href="/" variant="text-arrow">Terug naar home</Button>
            </div>
          </div>
        </section>

        {/* ── StatusBadge ── */}
        <section className="space-y-8">
          <h2 className="text-h3 font-walsheim text-black border-b border-grey pb-3">
            StatusBadge
          </h2>

          <div className="space-y-4">
            <p className="text-body3 font-helvetica text-black/50 uppercase tracking-wider">Filled</p>
            <div className="flex flex-wrap gap-4">
              <StatusBadge status="open" />
              <StatusBadge status="open" label="Open tot 18:00u" />
              <StatusBadge status="gesloten" />
              <StatusBadge status="gesloten" label="Gesloten vandaag" />
              <StatusBadge status="verhuurd" />
              <StatusBadge status="verhuurd" label="Verhuurd t/m 17:00u" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-body3 font-helvetica text-black/50 uppercase tracking-wider">Outline</p>
            <div className="flex flex-wrap gap-4">
              <StatusBadge status="open" variant="outline" />
              <StatusBadge status="open" label="Open tot 18:00u" variant="outline" />
              <StatusBadge status="gesloten" variant="outline" />
              <StatusBadge status="gesloten" label="Gesloten vandaag" variant="outline" />
              <StatusBadge status="verhuurd" variant="outline" />
              <StatusBadge status="verhuurd" label="Verhuurd t/m 17:00u" variant="outline" />
            </div>
          </div>

          <div className="bg-sienna rounded-2xl p-6 space-y-4">
            <p className="text-body3 font-helvetica text-white/60 uppercase tracking-wider">Op sienna achtergrond (footer)</p>
            <div className="flex flex-wrap gap-4">
              <StatusBadge status="open" variant="outline" className="border-white text-white" />
              <StatusBadge status="open" label="Open tot 18:00u" variant="outline" className="border-white text-white" />
            </div>
          </div>
        </section>

        {/* ── Typografie ── */}
        <section className="space-y-6">
          <h2 className="text-h3 font-walsheim text-black border-b border-grey pb-3">
            Typografie
          </h2>
          <div className="space-y-4">
            <p className="text-h1 font-walsheim">H1 — 72px / -0.03em</p>
            <p className="text-h2 font-walsheim">H2 — 56px / -0.03em</p>
            <p className="text-h3 font-walsheim">H3 — 40px / -0.02em</p>
            <p className="text-h4 font-walsheim">H4 — 29px / -0.01em</p>
            <p className="text-sub1 font-walsheim">Sub1 — 20px medium</p>
            <p className="text-sub2 font-walsheim">Sub2 — 18px medium</p>
            <p className="text-sub3 font-walsheim">Sub3 — 16px medium</p>
            <p className="text-body1 font-walsheim">Body1 — 20px regular, dit is een langere zin om de regelafstand te laten zien.</p>
            <p className="text-body2 font-walsheim">Body2 — 17px regular, dit is een langere zin om de regelafstand te laten zien.</p>
            <p className="text-body3 font-helvetica">Body3 — 14px Helvetica Neue medium</p>
          </div>
        </section>

        {/* ── Kleuren ── */}
        <section className="space-y-6">
          <h2 className="text-h3 font-walsheim text-black border-b border-grey pb-3">
            Kleurenpalet
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'forest', hex: '#789928', bg: 'bg-forest', text: 'text-white' },
              { name: 'sienna', hex: '#853F21', bg: 'bg-sienna', text: 'text-white' },
              { name: 'caramel', hex: '#B07826', bg: 'bg-caramel', text: 'text-white' },
              { name: 'moss', hex: '#8D9462', bg: 'bg-moss', text: 'text-white' },
              { name: 'ivory', hex: '#F3EEE2', bg: 'bg-ivory border border-grey', text: 'text-black' },
              { name: 'grey', hex: '#E0E1DA', bg: 'bg-grey', text: 'text-black' },
              { name: 'black', hex: '#262628', bg: 'bg-black', text: 'text-white' },
              { name: 'white', hex: '#FFFFFF', bg: 'bg-white border border-grey', text: 'text-black' },
            ].map((color) => (
              <div key={color.name} className={`rounded-xl p-4 ${color.bg}`}>
                <p className={`text-sub3 font-walsheim font-medium ${color.text}`}>
                  {color.name}
                </p>
                <p className={`text-body3 font-helvetica opacity-70 ${color.text}`}>
                  {color.hex}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
