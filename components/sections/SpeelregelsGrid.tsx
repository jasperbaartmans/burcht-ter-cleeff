import Image from 'next/image'
import { Symbol, type SymbolName } from '@/components/ui/symbols'

const sanityToSymbol: Record<string, SymbolName> = {
  risk:    'warning',
  trash:   'trash',
  noDog:   'noDog',
  bike:    'bike',
  noSmoke: 'noSmoke',
  toy:     'toy',
  doc:     'doc',
  person:  'person',
  shirt:   'shirt',
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
  const bg = variant === 'dark' ? 'bg-forest' : 'bg-[#EFF3E2]'
  const titleColor = variant === 'dark' ? 'text-white' : 'text-forest'
  const textColor = variant === 'dark' ? 'text-white/80' : 'text-black/70'

  return (
    <div className={`${bg} rounded-2xl p-5 flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-2">
        <p className={`text-sub2 font-dm-sans leading-snug ${titleColor}`}>{titel}</p>
        <span className="shrink-0 mt-0.5">{icon}</span>
      </div>
      <p className={`text-body2 font-dm-sans ${textColor}`}>{tekst}</p>
    </div>
  )
}

// ── Fallback data ───────────────────────────────────────────────────────────

const fallbackRegels = [
  { titel: 'Toegang voor leden',          tekst: 'Leden van de speeltuinvereniging hebben onbeperkt toegang tijdens de reguliere openingstijden van de speeltuin.',                         variant: 'light' as Variant, icon: 'person'  },
  { titel: 'Toegangsprijs voor niet-leden',tekst: 'Niet-leden betalen een toegangsprijs van €0,60 per persoon per bezoek. Dit bedrag wordt betaald bij de beheerder.',                     variant: 'dark'  as Variant, icon: 'person'  },
  { titel: 'Spelen op eigen risico',       tekst: 'Spelen voor zowel jong als oud gebeurt volledig op eigen risico. Houd hier rekening mee bij het betreden van de speeltuin.',             variant: 'light' as Variant, icon: 'risk'    },
  { titel: 'Afval opruimen',               tekst: 'Alle bezoekers dienen hun afval direct in de daarvoor bestemde afvalbakken te deponeren. Zo houden we de speeltuin schoon.',            variant: 'dark'  as Variant, icon: 'trash'   },
  { titel: 'Speelgoed terugzetten',        tekst: 'Speelgoed dat van de speeltuin gebruikt wordt, dient na gebruik netjes teruggezet te worden in het daarvoor bestemde schuurtje.',      variant: 'dark'  as Variant, icon: 'toy'     },
  { titel: 'Algemene reglementen',         tekst: 'Bij het betreden van de speeltuin aanvaard je automatisch het algemeen reglement, dat beschikbaar is bij de beheerder.',                variant: 'dark'  as Variant, icon: 'doc'     },
  { titel: 'Honden zijn niet toegestaan',  tekst: 'Honden mogen niet mee de speeltuin in, met uitzondering van geleidehonden die altijd welkom zijn.',                                    variant: 'dark'  as Variant, icon: 'noDog'   },
  { titel: 'Fietsen parkeren',             tekst: 'Fietsen dienen buiten de speeltuin geparkeerd te worden. Fietsen zijn niet toegestaan binnen de speeltuin.',                            variant: 'light' as Variant, icon: 'bike'    },
  { titel: 'Verboden te roken en drinken', tekst: 'Roken en het gebruik van alcohol en 0.0% zijn strikt verboden binnen de speeltuin. Dit geldt voor alle bezoekers.',                    variant: 'dark'  as Variant, icon: 'noSmoke' },
  { titel: 'Kleding in de speeltuin',      tekst: 'Kinderen dienen altijd, ook wanneer de fontein aanstaat, minimaal een onderbroekje of (zwem)luier te dragen.',                         variant: 'light' as Variant, icon: 'shirt'   },
]

// ── Main component ─────────────────────────────────────────────────────────

interface Props {
  data?: {
    h2?: string
    regels?: Array<{
      titel?: string
      tekst?: string
      variant?: 'light' | 'dark'
      icon?: string
    }>
  }
}

export default function SpeelregelsGrid({ data }: Props) {
  const h2 = data?.h2 ?? 'Dit zijn onze speelregels'
  const regels = (data?.regels && data.regels.length > 0 ? data.regels : fallbackRegels).map((r) => ({
    titel: r.titel ?? '',
    tekst: r.tekst ?? '',
    variant: (r.variant ?? 'light') as Variant,
    icon: r.icon ?? '',
  }))

  const third = Math.ceil(regels.length / 3)
  const col1 = regels.slice(0, third)
  const col2 = regels.slice(third, third * 2)
  const col3 = regels.slice(third * 2)

  function renderCard(r: typeof regels[0]) {
    const symbolName = sanityToSymbol[r.icon] as SymbolName | undefined
    const icon = symbolName
      ? <Symbol name={symbolName} size={24} className={r.variant === 'light' ? 'text-forest' : 'text-white'} />
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

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[1360px] mx-auto">

        <h2 className="text-h3 font-dm-sans text-black text-center mb-12">
          {h2.split('speelregels').length > 1 ? (
            <>
              {h2.split('speelregels')[0]}
              <span className="text-forest">speelregels</span>
              {h2.split('speelregels')[1]}
            </>
          ) : h2}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="flex flex-col gap-4">
            {col1.map(renderCard)}
          </div>

          <div className="flex flex-col gap-4">
            {col2.map(renderCard)}
          </div>

          <div className="flex flex-col gap-4">
            {col3.slice(0, 2).map(renderCard)}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-grey">
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
