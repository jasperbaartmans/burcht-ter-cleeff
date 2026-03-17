import Image from 'next/image'

// ── Icons ──────────────────────────────────────────────────────────────────

function IconRisk({ light }: { light?: boolean }) {
  const c = light ? '#78992B' : 'white'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l1.5 5h5l-4 3 1.5 5L12 13l-4 3 1.5-5-4-3h5z" fill={c} />
    </svg>
  )
}

function IconTrash({ light }: { light?: boolean }) {
  const c = light ? '#78992B' : 'white'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="7" width="14" height="13" rx="2" stroke={c} strokeWidth="1.5" />
      <path d="M3 7h18M9 7V5h6v2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="11" x2="10" y2="16" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="11" x2="14" y2="16" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconNoDog({ light }: { light?: boolean }) {
  const c = light ? '#78992B' : 'white'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.5" />
      <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 9c.5-1.5 2-2.5 3.5-2 1.5.5 2 2 1.5 3.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14c.5 1 1.5 2 3 2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconBike({ light }: { light?: boolean }) {
  const c = light ? '#78992B' : 'white'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="16" r="3" stroke={c} strokeWidth="1.5" />
      <circle cx="18" cy="16" r="3" stroke={c} strokeWidth="1.5" />
      <path d="M6 16l4-7h4l2 7" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 9l2 7" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="8" r="1.5" fill={c} />
    </svg>
  )
}

function IconNoSmoke({ light }: { light?: boolean }) {
  const c = light ? '#78992B' : 'white'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.5" />
      <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="4" y="13" width="12" height="2.5" rx="1" fill={c} opacity="0.7" />
    </svg>
  )
}

function IconToy({ light }: { light?: boolean }) {
  const c = light ? '#78992B' : 'white'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="10" width="10" height="9" rx="2" stroke={c} strokeWidth="1.5" />
      <path d="M10 10V8a2 2 0 0 1 4 0v2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconDoc({ light }: { light?: boolean }) {
  const c = light ? '#78992B' : 'white'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke={c} strokeWidth="1.5" />
      <line x1="8" y1="8" x2="16" y2="8" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="12" x2="16" y2="12" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="16" x2="12" y2="16" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconPerson({ light }: { light?: boolean }) {
  const c = light ? '#78992B' : 'white'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="7" r="3.5" stroke={c} strokeWidth="1.5" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconShirt({ light }: { light?: boolean }) {
  const c = light ? '#78992B' : 'white'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7l3-3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2l3 3-2 2v11H6V9L4 7z"
        stroke={c} strokeWidth="1.5" strokeLinejoin="round"
      />
    </svg>
  )
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

// ── Main component ─────────────────────────────────────────────────────────

export default function SpeelregelsGrid() {
  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[1360px] mx-auto">

        {/* Sectie-titel */}
        <h2 className="text-h3 font-dm-sans text-black text-center mb-12">
          Dit zijn onze{' '}
          <span className="text-forest">speelregels</span>
        </h2>

        {/* 3-koloms grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

          {/* Kolom 1 */}
          <div className="flex flex-col gap-4">
            <RuleCard
              variant="light"
              titel="Spelen op eigen risico"
              tekst="Spelen voor zowel jong als oud gebeurt volledig op eigen risico. Houd hier rekening mee bij het betreden van de speeltuin."
              icon={<IconRisk light />}
            />
            <RuleCard
              variant="dark"
              titel="Honden zijn niet toegestaan"
              tekst="Honden mogen niet mee de speeltuin in, met uitzondering van geleidehonden die altijd welkom zijn."
              icon={<IconNoDog />}
            />
            <RuleCard
              variant="light"
              titel="Fietsen parkeren"
              tekst="Fietsen dienen buiten de speeltuin geparkeerd te worden. Fietsen zijn niet toegestaan binnen de speeltuin."
              icon={<IconBike light />}
            />
            <RuleCard
              variant="dark"
              titel="Verboden te roken en drinken"
              tekst="Roken en het gebruik van alcohol zijn strikt verboden binnen de speeltuin. Dit geldt voor alle bezoekers."
              icon={<IconNoSmoke />}
            />
          </div>

          {/* Kolom 2 */}
          <div className="flex flex-col gap-4">
            <RuleCard
              variant="dark"
              titel="Afval opruimen"
              tekst="Alle bezoekers dienen hun afval direct in de daarvoor bestemde afvalbakken te deponeren. Zo houden we de speeltuin schoon."
              icon={<IconTrash />}
            />
            <RuleCard
              variant="light"
              titel="Speelgoed terugzetten"
              tekst="Speelgoed dat van de speeltuin gebruikt wordt, dient na gebruik netjes teruggezet te worden in het daarvoor bestemde schuurtje."
              icon={<IconToy light />}
            />
            <RuleCard
              variant="dark"
              titel="Algemene reglementen"
              tekst="Bij het betreden van de speeltuin aanvaard je automatisch het algemeen reglement, dat beschikbaar is bij de beheerder."
              icon={<IconDoc />}
            />
          </div>

          {/* Kolom 3 */}
          <div className="flex flex-col gap-4">
            <RuleCard
              variant="dark"
              titel="Toegang voor leden"
              tekst="Leden van de speeltuinvereniging hebben onbeperkt toegang tijdens de reguliere openingstijden van de speeltuin."
              icon={<IconPerson />}
            />
            <RuleCard
              variant="light"
              titel="Toegangsprijs voor niet-leden"
              tekst="Niet-leden betalen een toegangsprijs van €0,50 per persoon per bezoek. Dit bedrag wordt betaald bij de beheerder."
              icon={<IconPerson light />}
            />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-grey">
              <Image
                src="/images/feature-facilities.jpg"
                alt="Speeltoestellen bij Burcht ter Cleeff"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <RuleCard
              variant="light"
              titel="Kleding in de speeltuin"
              tekst="Kinderen dienen altijd, ook wanneer de fontein aanstaat, minimaal een onderbroekje of (zwem)luier te dragen."
              icon={<IconShirt light />}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
