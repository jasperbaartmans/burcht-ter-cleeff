import Image from 'next/image'
import { Symbol, type SymbolName } from '@/components/ui/symbols'

const sanityToSymbol: Record<string, SymbolName> = {
  risk:      'warning',
  trash:     'trash',
  noDog:     'noDog',
  bike:      'bike',
  noSmoke:   'noSmoke',
  toy:       'toy',
  doc:       'doc',
  person:    'person',
  shirt:     'shirt',
  ticket:    'ticket',
  userCheck: 'userCheck',
}

// ── Card component ─────────────────────────────────────────────────────────

type Variant = 'light' | 'dark'

interface RuleCardProps {
  titel: string
  tekst: string
  variant: Variant
  icon: React.ReactNode
}

function RuleCard({ titel, tekst, variant, icon }: RuleCardProps) {
  const bg         = variant === 'dark' ? 'bg-forest' : 'bg-ivory'
  const titleColor = variant === 'dark' ? 'text-white' : 'text-forest'
  const textColor  = variant === 'dark' ? 'text-white/80' : 'text-black'

  return (
    <div className={`${bg} rounded-3xl p-10 flex flex-col gap-20`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className={`text-h4 font-dm-sans font-normal ${titleColor}`}>{titel}</h3>
        <span className="shrink-0">{icon}</span>
      </div>
      <p className={`text-body1 font-dm-sans font-normal ${textColor}`}>{tekst}</p>
    </div>
  )
}

// ── Fallback data (geen variant — wordt globaal berekend) ───────────────────
// Volgorde bepaalt de variant: index 0 = dark, 1 = light, 2 = dark, …
// Kolom-indeling desktop:
//   col1 (indices 0-2): Honden | Fietsen | Verboden
//   col2 (indices 3-6): Spelen | Afval | Speelgoed | Algemene
//   col3 (indices 7-9): Toegang | Toegangsprijs | Kleding

const fallbackRegels = [
  { titel: 'Honden zijn niet toegestaan',   tekst: 'Honden mogen niet mee de speeltuin in, met uitzondering van geleidehonden die altijd welkom zijn.',                                    icon: 'noDog'    },
  { titel: 'Fietsen parkeren',              tekst: 'Fietsen dienen buiten de speeltuin geparkeerd te worden. Fietsen zijn niet toegestaan binnen de speeltuin.',                            icon: 'bike'     },
  { titel: 'Verboden te roken en drinken',  tekst: 'Roken en het gebruik van alcohol en 0.0% zijn strikt verboden binnen de speeltuin. Dit geldt voor alle bezoekers.',                    icon: 'noSmoke'  },
  { titel: 'Spelen op eigen risico',        tekst: 'Spelen voor zowel jong als oud gebeurt volledig op eigen risico. Houd hier rekening mee bij het betreden van de speeltuin.',            icon: 'risk'     },
  { titel: 'Afval opruimen',               tekst: 'Alle bezoekers dienen hun afval direct in de daarvoor bestemde afvalbakken te deponeren. Zo houden we de speeltuin schoon.',            icon: 'trash'    },
  { titel: 'Speelgoed terugzetten',        tekst: 'Speelgoed dat van de speeltuin gebruikt wordt, dient na gebruik netjes teruggezet te worden in het daarvoor bestemde schuurtje.',      icon: 'toy'      },
  { titel: 'Algemene reglementen',         tekst: 'Bij het betreden van de speeltuin aanvaard je automatisch het algemeen reglement, dat beschikbaar is bij de beheerder.',                icon: 'doc'      },
  { titel: 'Toegang voor leden',           tekst: 'Leden van de speeltuinvereniging hebben onbeperkt toegang tijdens de reguliere openingstijden van de speeltuin.',                        icon: 'ticket'   },
  { titel: 'Toegangsprijs voor niet-leden',tekst: 'Niet-leden betalen een toegangsprijs van €0,60 per persoon per bezoek. Dit bedrag wordt betaald bij de beheerder.',                     icon: 'userCheck'},
  { titel: 'Kleding in de speeltuin',      tekst: 'Kinderen dienen altijd, ook wanneer de fontein aanstaat, minimaal een onderbroekje of (zwem)luier te dragen.',                          icon: 'shirt'    },
]

// ── Main component ─────────────────────────────────────────────────────────

interface SanityRegel {
  titel?: string
  tekst?: string
  icon?: string
}

interface Props {
  data?: {
    h2?: string
    regels?: SanityRegel[]
  }
}

function makeCard(r: { titel: string; tekst: string; variant: Variant; icon: string }) {
  const symbolName = sanityToSymbol[r.icon] as SymbolName | undefined
  const icon = symbolName
    ? <Symbol name={symbolName} size={40} className={r.variant === 'light' ? 'text-forest' : 'text-white'} />
    : null
  return (
    <RuleCard
      key={r.titel}
      variant={r.variant}
      titel={r.titel}
      tekst={r.tekst}
      icon={icon}
    />
  )
}

export default function SpeelregelsGrid({ data }: Props) {
  const h2 = data?.h2 ?? 'Dit zijn onze speelregels'

  // Bouw een platte lijst en ken variant toe op basis van globale index.
  // Zo wisselt de kleur altijd correct af, ook op mobiel (één kolom).
  const base = (data?.regels && data.regels.length > 0)
    ? data.regels.map((r) => ({ titel: r.titel ?? '', tekst: r.tekst ?? '', icon: r.icon ?? '' }))
    : fallbackRegels

  const all = base.map((r, i) => ({
    ...r,
    variant: (i % 2 === 0 ? 'dark' : 'light') as Variant,
  }))

  // Desktop 3-koloms indeling
  const third = Math.ceil(all.length / 3)
  const col1 = all.slice(0, third)
  const col2 = all.slice(third, third * 2)
  const col3 = all.slice(third * 2)

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1360px] mx-auto">

        <h2 className="text-h3 font-dm-sans text-black text-center mb-12">
          {h2.includes('speelregels') ? (
            <>
              {h2.split('speelregels')[0]}
              <span className="text-forest">speelregels</span>
              {h2.split('speelregels')[1]}
            </>
          ) : h2}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* Kolom 1: foto bovenaan + kaarten */}
          <div className="flex flex-col gap-8">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-grey">
              <Image
                src="/images/schommel.jpg"
                alt="Kind speelt bij Burcht ter Cleeff"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {col1.map(makeCard)}
          </div>

          {/* Kolom 2: kaarten */}
          <div className="flex flex-col gap-8">
            {col2.map(makeCard)}
          </div>

          {/* Kolom 3: kaarten + foto + rest */}
          <div className="flex flex-col gap-8">
            {col3.slice(0, 2).map(makeCard)}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-grey">
              <Image
                src="/images/feature-facilities.jpg"
                alt="Speeltoestellen bij Burcht ter Cleeff"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {col3.slice(2).map(makeCard)}
          </div>

        </div>
      </div>
    </section>
  )
}
