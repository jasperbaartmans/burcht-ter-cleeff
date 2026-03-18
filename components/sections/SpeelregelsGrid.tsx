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
  const textColor  = variant === 'dark' ? 'text-white/80' : 'text-black/70'

  return (
    <div className={`${bg} rounded-3xl p-10 flex flex-col gap-20`}>
      <div className="flex items-start justify-between gap-4">
        <p className={`font-dm-sans ${titleColor}`} style={{ fontSize: '26px', lineHeight: '30px', letterSpacing: '-0.26px', fontWeight: '400' }}>{titel}</p>
        <span className="shrink-0">{icon}</span>
      </div>
      <p className={`font-dm-sans font-normal ${textColor}`} style={{ fontSize: '20px', lineHeight: '28px' }}>{tekst}</p>
    </div>
  )
}

// ── Fallback data ───────────────────────────────────────────────────────────
// Kolom 1 (links):  foto + Honden (dark) + Fietsen (light) + Verboden (dark)
// Kolom 2 (midden): Spelen (light) + Afval (dark) + Speelgoed (light) + Algemene (dark)
// Kolom 3 (rechts): Toegang (dark) + Toegangsprijs (light) + foto + Kleding (light)

const col1Regels = [
  { titel: 'Honden zijn niet toegestaan',  tekst: 'Honden mogen niet mee de speeltuin in, met uitzondering van geleidehonden die altijd welkom zijn.',                                    variant: 'dark'  as Variant, icon: 'noDog'   },
  { titel: 'Fietsen parkeren',             tekst: 'Fietsen dienen buiten de speeltuin geparkeerd te worden. Fietsen zijn niet toegestaan binnen de speeltuin.',                            variant: 'light' as Variant, icon: 'bike'    },
  { titel: 'Verboden te roken en drinken', tekst: 'Roken en het gebruik van alcohol en 0.0% zijn strikt verboden binnen de speeltuin. Dit geldt voor alle bezoekers.',                    variant: 'dark'  as Variant, icon: 'noSmoke' },
]

const col2Regels = [
  { titel: 'Spelen op eigen risico',       tekst: 'Spelen voor zowel jong als oud gebeurt volledig op eigen risico. Houd hier rekening mee bij het betreden van de speeltuin.',             variant: 'light' as Variant, icon: 'risk'    },
  { titel: 'Afval opruimen',               tekst: 'Alle bezoekers dienen hun afval direct in de daarvoor bestemde afvalbakken te deponeren. Zo houden we de speeltuin schoon.',            variant: 'dark'  as Variant, icon: 'trash'   },
  { titel: 'Speelgoed terugzetten',        tekst: 'Speelgoed dat van de speeltuin gebruikt wordt, dient na gebruik netjes teruggezet te worden in het daarvoor bestemde schuurtje.',      variant: 'light' as Variant, icon: 'toy'     },
  { titel: 'Algemene reglementen',         tekst: 'Bij het betreden van de speeltuin aanvaard je automatisch het algemeen reglement, dat beschikbaar is bij de beheerder.',                variant: 'dark'  as Variant, icon: 'doc'     },
]

const col3Regels = [
  { titel: 'Toegang voor leden',           tekst: 'Leden van de speeltuinvereniging hebben onbeperkt toegang tijdens de reguliere openingstijden van de speeltuin.',                         variant: 'dark'  as Variant, icon: 'ticket'    },
  { titel: 'Toegangsprijs voor niet-leden',tekst: 'Niet-leden betalen een toegangsprijs van €0,60 per persoon per bezoek. Dit bedrag wordt betaald bij de beheerder.',                     variant: 'light' as Variant, icon: 'userCheck' },
  { titel: 'Kleding in de speeltuin',      tekst: 'Kinderen dienen altijd, ook wanneer de fontein aanstaat, minimaal een onderbroekje of (zwem)luier te dragen.',                         variant: 'light' as Variant, icon: 'shirt'   },
]

// ── Main component ─────────────────────────────────────────────────────────

interface SanityRegel {
  titel?: string
  tekst?: string
  variant?: 'light' | 'dark'
  icon?: string
}

interface Props {
  data?: {
    h2?: string
    regels?: SanityRegel[]
  }
}

function renderCard(r: { titel: string; tekst: string; variant: Variant; icon: string }) {
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

  // When Sanity provides regels, use the existing 3-column split logic.
  // Otherwise use the hand-tuned per-column fallback data.
  const hasSanityData = data?.regels && data.regels.length > 0

  let col1: typeof col1Regels
  let col2: typeof col2Regels
  let col3: typeof col3Regels

  if (hasSanityData) {
    const all = (data!.regels!).map((r) => ({
      titel:   r.titel   ?? '',
      tekst:   r.tekst   ?? '',
      variant: (r.variant ?? 'light') as Variant,
      icon:    r.icon    ?? '',
    }))
    const third = Math.ceil(all.length / 3)
    col1 = all.slice(0, third)
    col2 = all.slice(third, third * 2)
    col3 = all.slice(third * 2)
  } else {
    col1 = col1Regels
    col2 = col2Regels
    col3 = col3Regels
  }

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12">
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

          {/* Kolom 1: foto bovenaan + 3 kaarten */}
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
            {col1.map(renderCard)}
          </div>

          {/* Kolom 2: 4 kaarten, afwisselend licht/donker */}
          <div className="flex flex-col gap-8">
            {col2.map(renderCard)}
          </div>

          {/* Kolom 3: 2 kaarten + foto + 1 kaart */}
          <div className="flex flex-col gap-8">
            {col3.slice(0, 2).map(renderCard)}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-grey">
              <Image
                src="/images/feature-facilities.jpg"
                alt="Speeltoestellen bij Burcht ter Cleeff"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {col3.slice(2).map(renderCard)}
          </div>

        </div>
      </div>
    </section>
  )
}
