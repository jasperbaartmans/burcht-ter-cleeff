import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/ui/StatusBadge'
import LogoIcon from '@/components/ui/LogoIcon'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Stijlgids — Burcht ter Cleeff',
  robots: { index: false, follow: false },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-h4 font-dm-sans text-black mb-1">{title}</h2>
      <div className="w-full h-px bg-grey mb-8" />
      {children}
    </section>
  )
}

function Swatch({ name, hex, className }: { name: string; hex: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`w-20 h-20 rounded-xl ${className} border border-black/10`} />
      <span className="text-body3 font-dm-sans font-medium text-black">{name}</span>
      <span className="text-body3 font-dm-sans text-black/50">{hex}</span>
    </div>
  )
}

export default function StijlgidsPage() {
  return (
    <div className="bg-ivory min-h-screen">
    <div className="pt-24 pb-32 px-10 max-w-[1360px] mx-auto">
      <div className="mb-16">
        <p className="text-body3 font-dm-sans text-black/40 uppercase tracking-widest mb-3">Intern — niet geïndexeerd</p>
        <h1 className="text-h2 font-dm-sans text-black">Stijlgids</h1>
        <p className="text-body1 text-black/60 mt-2 max-w-xl">
          Overzicht van alle kleuren, typografie, componenten en hover states. Gebruik dit als referentie bij het bouwen van nieuwe pagina&apos;s.
        </p>
      </div>

      {/* Kleuren */}
      <Section title="Kleuren">
        <div className="flex flex-wrap gap-8">
          <Swatch name="Black" hex="#262628" className="bg-black" />
          <Swatch name="White" hex="#FFFFFF" className="bg-white" />
          <Swatch name="Ivory" hex="#F3EEE2" className="bg-ivory" />
          <Swatch name="Grey" hex="#E0E1DA" className="bg-grey" />
          <Swatch name="Forest" hex="#78992B" className="bg-forest" />
          <Swatch name="Moss" hex="#8D9482" className="bg-moss" />
          <Swatch name="Sienna" hex="#853F21" className="bg-sienna" />
          <Swatch name="Caramel" hex="#B07826" className="bg-caramel" />
        </div>
      </Section>

      {/* Typografie */}
      <Section title="Typografie">
        <div className="flex flex-col divide-y divide-grey">
          {[
            { name: 'H1',       cls: 'text-h1',    font: 'DM Sans', fontCls: 'font-dm-sans', weight: 'Regular', size: 72,  lh: 70,  ls: '-3%', ps: 0  },
            { name: 'H2',       cls: 'text-h2',    font: 'DM Sans', fontCls: 'font-dm-sans', weight: 'Regular', size: 56,  lh: 60,  ls: '-3%', ps: 0  },
            { name: 'H3',       cls: 'text-h3',    font: 'DM Sans', fontCls: 'font-dm-sans', weight: 'Medium',  size: 40,  lh: 44,  ls: '-2%', ps: 0  },
            { name: 'H4',       cls: 'text-h4',    font: 'DM Sans', fontCls: 'font-dm-sans', weight: 'Medium',  size: 29,  lh: 30,  ls: '-1%', ps: 0  },
            { name: 'Subtitle 1', cls: 'text-sub1', font: 'DM Sans', fontCls: 'font-dm-sans', weight: 'Medium',  size: 20,  lh: 20,  ls: '-1%', ps: 0  },
            { name: 'Subtitle 2', cls: 'text-sub2', font: 'DM Sans', fontCls: 'font-dm-sans', weight: 'Medium',  size: 18,  lh: 30,  ls: '-1%', ps: 0  },
            { name: 'Subtitle 3', cls: 'text-sub3', font: 'DM Sans', fontCls: 'font-dm-sans', weight: 'Medium',  size: 16,  lh: 20,  ls: '-1%', ps: 0  },
            { name: 'Body 1',   cls: 'text-body1', font: 'DM Sans', fontCls: 'font-dm-sans', weight: 'Regular', size: 20,  lh: 26,  ls: '-3%', ps: 12 },
            { name: 'Body 2',   cls: 'text-body2', font: 'DM Sans', fontCls: 'font-dm-sans', weight: 'Regular', size: 17,  lh: 23,  ls: '-3%', ps: 8  },
            { name: 'Body 3',   cls: 'text-body3', font: 'DM Sans',  fontCls: 'font-dm-sans', weight: 'Medium',  size: 14,  lh: 20,  ls: '-1%', ps: 6  },
          ].map(({ name, cls, font, fontCls, weight, size, lh, ls, ps }) => (
            <div key={name} className="flex items-center justify-between py-6 gap-8">
              {/* Tekstvoorbeeld */}
              <span className={`${cls} ${fontCls} text-black shrink-0`}>{name}</span>
              {/* Specs */}
              <div className="flex gap-8 text-body3 font-dm-sans text-black/50 shrink-0 ml-auto">
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
                  <span className="text-body2 font-dm-sans">Koop een kaartje</span>
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
                  <span className="text-body2 font-dm-sans">Inloggen</span>
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

      {/* Forms */}
      <Section title="Forms">
        <div className="flex flex-wrap gap-8">

          {/* Select / dropdown */}
          <div className="flex flex-col gap-3">
            <p className="text-body3 font-dm-sans text-black/40 uppercase tracking-widest">Select</p>
            <div className="flex flex-col gap-3 p-8 bg-white rounded-2xl w-64">

              {/* Default */}
              <div className="relative">
                <select className="w-full h-11 px-4 pr-10 bg-white border border-grey rounded-full text-body2 font-dm-sans text-black/40 appearance-none focus:outline-none cursor-pointer">
                  <option>Label</option>
                </select>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="#262628" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Active / focused */}
              <div className="relative">
                <select className="w-full h-11 px-4 pr-10 bg-white border border-black rounded-full text-body2 font-dm-sans text-black appearance-none focus:outline-none cursor-pointer">
                  <option>Label</option>
                </select>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="#262628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute -bottom-4 left-2 text-body3 font-dm-sans text-black/30">active</span>
              </div>

              {/* Error */}
              <div className="relative mt-2">
                <select className="w-full h-11 px-4 pr-10 bg-white border border-sienna rounded-full text-body2 font-dm-sans text-sienna appearance-none focus:outline-none cursor-pointer">
                  <option>Label</option>
                </select>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="#853F21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute -bottom-4 left-2 text-body3 font-dm-sans text-black/30">error</span>
              </div>

            </div>
          </div>

          {/* Toggle */}
          <div className="flex flex-col gap-3">
            <p className="text-body3 font-dm-sans text-black/40 uppercase tracking-widest">Toggle</p>
            <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
              {/* Off */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-grey rounded-full relative cursor-pointer shrink-0">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
                <span className="text-body3 font-dm-sans text-black/40">off</span>
              </div>
              {/* On */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-forest rounded-full relative cursor-pointer shrink-0">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
                <span className="text-body3 font-dm-sans text-black/40">on</span>
              </div>
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

      {/* Kalender dagcellen */}
      <Section title="Kalender — dagcellen">
        <div className="p-8 bg-white rounded-2xl">
          <p className="text-body3 font-dm-sans text-black/40 mb-6 uppercase tracking-widest">Dag-states</p>
          <div className="flex items-center gap-2">

            {/* Vorige navigatie */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-grey transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#262628" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Default */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-9 h-9 flex items-center justify-center rounded-full">
                <span className="text-body2 font-dm-sans text-black/40">22</span>
              </div>
              <span className="text-body3 font-dm-sans text-black/30">default</span>
            </div>

            {/* Selected */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-forest">
                <span className="text-body2 font-dm-sans text-white">22</span>
              </div>
              <span className="text-body3 font-dm-sans text-black/30">selected</span>
            </div>

            {/* Beschikbaar (groene dot) */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-9 h-9 flex items-center justify-center rounded-full relative">
                <span className="text-body2 font-dm-sans text-forest">22</span>
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-forest" />
              </div>
              <span className="text-body3 font-dm-sans text-black/30">open</span>
            </div>

            {/* Verhuurd/gesloten (rode dot) */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-9 h-9 flex items-center justify-center rounded-full relative">
                <span className="text-body2 font-dm-sans text-forest">22</span>
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sienna" />
              </div>
              <span className="text-body3 font-dm-sans text-black/30">verhuurd</span>
            </div>

            {/* Disabled */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-9 h-9 flex items-center justify-center rounded-full">
                <span className="text-body2 font-dm-sans text-black/20">22</span>
              </div>
              <span className="text-body3 font-dm-sans text-black/30">disabled</span>
            </div>

            {/* Volgende navigatie */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-grey transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#262628" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

          </div>
        </div>
      </Section>

      {/* Logo */}
      <Section title="Logo">
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col items-start gap-4 p-8 bg-black rounded-2xl">
            <div className="flex items-center gap-2.5">
              <LogoIcon className="text-white" />
              <span className="text-[20px] font-dm-sans font-medium tracking-[-0.6px] text-white uppercase leading-none">
                Burcht ter Cleeff
              </span>
            </div>
            <span className="text-body3 text-white/40">Op donker</span>
          </div>
          <div className="flex flex-col items-start gap-4 p-8 bg-white rounded-2xl border border-grey">
            <div className="flex items-center gap-2.5">
              <LogoIcon className="text-black" />
              <span className="text-[20px] font-dm-sans font-medium tracking-[-0.6px] text-black uppercase leading-none">
                Burcht ter Cleeff
              </span>
            </div>
            <span className="text-body3 text-black/40">Op licht</span>
          </div>
          <div className="flex flex-col items-start gap-4 p-8 bg-forest rounded-2xl">
            <div className="flex items-center gap-2.5">
              <LogoIcon className="text-white" />
              <span className="text-[20px] font-dm-sans font-medium tracking-[-0.6px] text-white uppercase leading-none">
                Burcht ter Cleeff
              </span>
            </div>
            <span className="text-body3 text-white/60">Op forest</span>
          </div>
        </div>
      </Section>

      {/* Icons */}
      <Section title="Icons">
        <div className="p-8 bg-white rounded-2xl">
          <div className="flex flex-wrap gap-6">
            {[
              { name: 'arrow-left',      d: 'M19 12H5M5 12L11 18M5 12L11 6' },
              { name: 'arrow-right',     d: 'M5 12H19M19 12L13 6M19 12L13 18' },
              { name: 'corner-up-left',  d: 'M9 14L4 9L9 4M20 20V13A4 4 0 0 0 16 9H4' },
              { name: 'corner-up-right', d: 'M15 14L20 9L15 4M4 20V13A4 4 0 0 0 8 9H20' },
              { name: 'arrow-up',        d: 'M12 19V5M5 12L12 5L19 12' },
              { name: 'arrow-down',      d: 'M12 5V19M19 12L12 19L5 12' },
              { name: 'chevron-left',    d: 'M15 18L9 12L15 6' },
              { name: 'chevron-right',   d: 'M9 18L15 12L9 6' },
              { name: 'chevron-down',    d: 'M6 9L12 15L18 9' },
              { name: 'x',              d: 'M18 6L6 18M6 6L18 18' },
              { name: 'plus',           d: 'M12 5V19M5 12H19' },
              { name: 'minus',          d: 'M5 12H19' },
              { name: 'menu',           d: 'M4 6H20M4 12H20M4 18H20' },
              { name: 'search',         d: 'M21 21L16.65 16.65M19 11A8 8 0 1 1 3 11A8 8 0 0 1 19 11' },
              { name: 'info',           d: 'M12 16V12M12 8H12.01M22 12A10 10 0 1 1 2 12A10 10 0 0 1 22 12Z' },
              { name: 'check',          d: 'M20 6L9 17L4 12' },
              { name: 'arrow-down-tray',d: 'M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15M7 10L12 15L17 10M12 15V3' },
              { name: 'rotate-ccw',     d: 'M3 12A9 9 0 1 0 6.22 6M3 3V6H6' },
            ].map(({ name, d }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label={name}>
                    <path d={d} stroke="#262628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-body3 font-dm-sans text-black/40 text-center">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Symbols */}
      <Section title="Symbols">
        <div className="p-8 bg-white rounded-2xl">
          <p className="text-body3 font-dm-sans text-black/40 mb-6 uppercase tracking-widest">Faciliteit- en activiteitssymbolen — forest kleur</p>
          <div className="flex flex-wrap gap-6">
            {[
              'Knutselen', 'Wandelen', 'Glijbaan', 'Water', 'Locatie',
              'Picknicktafel', 'Afval', 'Kamperen', 'Fitness', 'Fietsen',
              'Verboden', 'Persoon', 'Kleding', 'Huisdieren verboden',
              'Lijst', 'Gebouw',
            ].map((label) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded bg-forest/10 flex items-center justify-center">
                  <span className="text-body3 font-dm-sans text-forest/50">SVG</span>
                </div>
                <span className="text-body3 font-dm-sans text-black/40 text-center max-w-[60px]">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-body3 font-dm-sans text-black/30 mt-6">SVG-bestanden toevoegen in <code className="bg-grey px-1 rounded">/public/icons/symbols/</code></p>
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
              <span className="text-body2 font-dm-sans font-medium text-black w-56 shrink-0">{component}</span>
              <span className="text-body2 font-dm-sans text-black/60">{rule}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>

    {/* Footer component — full-width preview */}
    <div>
      <div className="px-10 max-w-[1360px] mx-auto mb-8">
        <h2 className="text-h4 font-dm-sans text-black mb-1">Footer</h2>
        <div className="w-full h-px bg-grey" />
      </div>
      <Footer />
    </div>

    </div>
  )
}
