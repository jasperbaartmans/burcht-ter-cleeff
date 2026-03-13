import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/ui/StatusBadge'
import LogoIcon from '@/components/ui/LogoIcon'

export const metadata: Metadata = {
  title: 'Stijlgids — Burcht ter Cleeff',
  robots: { index: false, follow: false },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-h4 font-walsheim text-black mb-1">{title}</h2>
      <div className="w-full h-px bg-grey mb-8" />
      {children}
    </section>
  )
}

function Swatch({ name, hex, className }: { name: string; hex: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`w-20 h-20 rounded-xl ${className} border border-black/10`} />
      <span className="text-body3 font-walsheim font-medium text-black">{name}</span>
      <span className="text-body3 font-helvetica text-black/50">{hex}</span>
    </div>
  )
}

export default function StijlgidsPage() {
  return (
    <div className="bg-ivory min-h-screen pt-24 pb-32 px-10 max-w-[1360px] mx-auto">
      <div className="mb-16">
        <p className="text-body3 font-walsheim text-black/40 uppercase tracking-widest mb-3">Intern — niet geïndexeerd</p>
        <h1 className="text-h2 font-walsheim text-black">Stijlgids</h1>
        <p className="text-body1 text-black/60 mt-2 max-w-xl">
          Overzicht van alle kleuren, typografie, componenten en hover states. Gebruik dit als referentie bij het bouwen van nieuwe pagina's.
        </p>
      </div>

      {/* Kleuren */}
      <Section title="Kleuren">
        <div className="flex flex-wrap gap-8">
          <Swatch name="Black" hex="#262628" className="bg-black" />
          <Swatch name="White" hex="#FFFFFF" className="bg-white" />
          <Swatch name="Ivory" hex="#F3EEE2" className="bg-ivory" />
          <Swatch name="Grey" hex="#E0E1DA" className="bg-grey" />
          <Swatch name="Forest" hex="#789928" className="bg-forest" />
          <Swatch name="Moss" hex="#8D9462" className="bg-moss" />
          <Swatch name="Sienna" hex="#853F21" className="bg-sienna" />
          <Swatch name="Caramel" hex="#B07826" className="bg-caramel" />
        </div>
      </Section>

      {/* Typografie */}
      <Section title="Typografie">
        <div className="flex flex-col divide-y divide-grey">
          {[
            { name: 'H1',       cls: 'text-h1',    font: 'GT Walsheim Pro', fontCls: 'font-walsheim', weight: 'Regular', size: 72,  lh: 70,  ls: '-3%', ps: 0  },
            { name: 'H2',       cls: 'text-h2',    font: 'GT Walsheim Pro', fontCls: 'font-walsheim', weight: 'Regular', size: 56,  lh: 60,  ls: '-3%', ps: 0  },
            { name: 'H3',       cls: 'text-h3',    font: 'GT Walsheim Pro', fontCls: 'font-walsheim', weight: 'Medium',  size: 40,  lh: 44,  ls: '-2%', ps: 0  },
            { name: 'H4',       cls: 'text-h4',    font: 'GT Walsheim Pro', fontCls: 'font-walsheim', weight: 'Medium',  size: 29,  lh: 30,  ls: '-1%', ps: 0  },
            { name: 'Subtitle 1', cls: 'text-sub1', font: 'GT Walsheim Pro', fontCls: 'font-walsheim', weight: 'Medium',  size: 20,  lh: 20,  ls: '-1%', ps: 0  },
            { name: 'Subtitle 2', cls: 'text-sub2', font: 'GT Walsheim Pro', fontCls: 'font-walsheim', weight: 'Medium',  size: 18,  lh: 30,  ls: '-1%', ps: 0  },
            { name: 'Subtitle 3', cls: 'text-sub3', font: 'GT Walsheim Pro', fontCls: 'font-walsheim', weight: 'Medium',  size: 16,  lh: 20,  ls: '-1%', ps: 0  },
            { name: 'Body 1',   cls: 'text-body1', font: 'GT Walsheim Pro', fontCls: 'font-walsheim', weight: 'Regular', size: 20,  lh: 26,  ls: '-3%', ps: 12 },
            { name: 'Body 2',   cls: 'text-body2', font: 'GT Walsheim Pro', fontCls: 'font-walsheim', weight: 'Regular', size: 17,  lh: 23,  ls: '-3%', ps: 8  },
            { name: 'Body 3',   cls: 'text-body3', font: 'Helvetica Neue',  fontCls: 'font-helvetica', weight: 'Medium',  size: 14,  lh: 20,  ls: '-1%', ps: 6  },
          ].map(({ name, cls, font, fontCls, weight, size, lh, ls, ps }) => (
            <div key={name} className="flex items-center justify-between py-6 gap-8">
              {/* Tekstvoorbeeld */}
              <span className={`${cls} ${fontCls} text-black shrink-0`}>{name}</span>
              {/* Specs */}
              <div className="flex gap-8 text-body3 font-helvetica text-black/50 shrink-0 ml-auto">
                <div className="flex flex-col gap-0.5 min-w-[120px]">
                  <span className="text-black font-medium">{font}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex gap-6">
                    <span>Weight <span className="text-black">{weight}</span></span>
                    <span>Letter-spacing <span className="text-black">{ls}</span></span>
                  </div>
                  <div className="flex gap-6">
                    <span>Size <span className="text-black">{size}</span></span>
                    <span>Paragraph-spacing <span className="text-black">{ps}</span></span>
                  </div>
                  <div className="flex gap-6">
                    <span>Line-height <span className="text-black">{lh}</span></span>
                    <span>Case <span className="text-black">Sentence</span></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <div className="space-y-10">

          {/* Op lichte achtergrond */}
          <div>
            <p className="text-body3 text-black/40 mb-4 uppercase tracking-widest">Op lichte achtergrond</p>
            <div className="flex flex-wrap items-center gap-6 p-8 bg-white rounded-2xl">
              <div className="flex flex-col items-center gap-2">
                <Button variant="primary" size="md">Boek nu</Button>
                <span className="text-body3 text-black/40">primary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button variant="ghost" size="md">Meer info</Button>
                <span className="text-body3 text-black/40">ghost</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button variant="text-arrow" size="md">Bekijk mogelijkheden</Button>
                <span className="text-body3 text-black/40">text-arrow</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button variant="arrow" size="md" aria-label="Volgende" />
                <span className="text-body3 text-black/40">arrow</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button variant="caramel" size="md">Bekijk de speelregels</Button>
                <span className="text-body3 text-black/40">caramel</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button variant="sienna" size="md">Meer info</Button>
                <span className="text-body3 text-black/40">sienna</span>
              </div>
            </div>
          </div>

          {/* Op donkere achtergrond */}
          <div>
            <p className="text-body3 text-black/40 mb-4 uppercase tracking-widest">Op donkere achtergrond (hero / navbar)</p>
            <div className="flex flex-wrap items-center gap-6 p-8 bg-black rounded-2xl">
              {/* arrow-outline: Koop een kaartje */}
              <div className="flex flex-col items-center gap-2">
                <a href="#" className="flex items-center gap-3 text-white group">
                  <span className="w-12 h-12 rounded-full border border-white group-hover:bg-forest group-hover:border-forest flex items-center justify-center shrink-0 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-body2 font-walsheim">Koop een kaartje</span>
                </a>
                <span className="text-body3 text-white/40">arrow-outline (hero)</span>
              </div>
              {/* Inloggen */}
              <div className="flex flex-col items-center gap-2">
                <a href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                  <span className="w-8 h-8 rounded-full border border-white/40 group-hover:bg-forest group-hover:border-forest flex items-center justify-center shrink-0 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-body2 font-walsheim">Inloggen</span>
                </a>
                <span className="text-body3 text-white/40">arrow-outline sm (navbar)</span>
              </div>
            </div>
          </div>

          {/* Groottes */}
          <div>
            <p className="text-body3 text-black/40 mb-4 uppercase tracking-widest">Groottes</p>
            <div className="flex flex-wrap items-center gap-6 p-8 bg-white rounded-2xl">
              <Button variant="primary" size="sm">Klein</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Groot</Button>
            </div>
          </div>

        </div>
      </Section>

      {/* Status badges */}
      <Section title="Status badges">
        <div className="space-y-6">
          <div>
            <p className="text-body3 text-black/40 mb-4 uppercase tracking-widest">Filled</p>
            <div className="flex flex-wrap gap-4 p-8 bg-white rounded-2xl">
              <StatusBadge status="open" label="Open tot 18:00u" variant="filled" />
              <StatusBadge status="gesloten" label="Gesloten tot 09:00u" variant="filled" />
              <StatusBadge status="verhuurd" label="Verhuurd tot 13:00u" variant="filled" />
            </div>
          </div>
          <div>
            <p className="text-body3 text-black/40 mb-4 uppercase tracking-widest">Outline</p>
            <div className="flex flex-wrap gap-4 p-8 bg-white rounded-2xl">
              <StatusBadge status="open" label="Open tot 18:00u" variant="outline" />
              <StatusBadge status="gesloten" label="Gesloten tot 09:00u" variant="outline" />
              <StatusBadge status="verhuurd" label="Verhuurd tot 13:00u" variant="outline" />
            </div>
          </div>
        </div>
      </Section>

      {/* Logo */}
      <Section title="Logo">
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col items-start gap-4 p-8 bg-black rounded-2xl">
            <div className="flex items-center gap-2.5">
              <LogoIcon className="text-white" />
              <span className="text-[20px] font-walsheim font-medium tracking-[-0.6px] text-white uppercase leading-none">
                Burcht ter Cleeff
              </span>
            </div>
            <span className="text-body3 text-white/40">Op donker</span>
          </div>
          <div className="flex flex-col items-start gap-4 p-8 bg-white rounded-2xl border border-grey">
            <div className="flex items-center gap-2.5">
              <LogoIcon className="text-black" />
              <span className="text-[20px] font-walsheim font-medium tracking-[-0.6px] text-black uppercase leading-none">
                Burcht ter Cleeff
              </span>
            </div>
            <span className="text-body3 text-black/40">Op licht</span>
          </div>
          <div className="flex flex-col items-start gap-4 p-8 bg-forest rounded-2xl">
            <div className="flex items-center gap-2.5">
              <LogoIcon className="text-white" />
              <span className="text-[20px] font-walsheim font-medium tracking-[-0.6px] text-white uppercase leading-none">
                Burcht ter Cleeff
              </span>
            </div>
            <span className="text-body3 text-white/60">Op forest</span>
          </div>
        </div>
      </Section>

      {/* Hover states beschrijving */}
      <Section title="Hover states — regels">
        <div className="bg-white rounded-2xl p-8 space-y-4">
          {[
            ['Nav link', 'text-white/70 → text-white'],
            ['Nav link (actief)', 'text-white + border-b-4 border-white (blijft staan)'],
            ['Inloggen cirkel', 'border-white/40 (outline) → bg-forest (gevuld)'],
            ['Koop een kaartje cirkel', 'border-white (outline) → bg-forest (gevuld)'],
            ['Button primary', 'bg-forest → bg-[#6a8822] (donkerder)'],
            ['Button ghost', 'border-forest text-forest → bg-forest text-white'],
            ['Button text-arrow', 'text-forest → text-[#6a8822] (donkerder)'],
            ['Button caramel', 'bg-caramel → bg-[#9a6820] (donkerder)'],
            ['Button sienna', 'bg-sienna → bg-[#722f17] (donkerder)'],
            ['Mobile nav link', 'text-white/60 → text-white'],
          ].map(([component, rule]) => (
            <div key={component} className="flex gap-6 py-3 border-b border-grey last:border-0">
              <span className="text-body2 font-walsheim font-medium text-black w-56 shrink-0">{component}</span>
              <span className="text-body2 font-helvetica text-black/60">{rule}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
