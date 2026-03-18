// Inline iconen passend bij de Figma (kasteel, lamp, picknicktafel)
function IconCastle() {
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="inline-block align-middle mx-1 shrink-0"
    >
      <circle cx="14" cy="14" r="14" fill="#78992B" />
      <rect x="7" y="15" width="14" height="8" fill="white" />
      <rect x="7" y="12" width="3" height="4" fill="white" />
      <rect x="11" y="12" width="3" height="4" fill="white" />
      <rect x="15" y="12" width="3" height="4" fill="white" />
      <rect x="19" y="12" width="3" height="4" fill="white" />
      <rect x="12" y="18" width="4" height="5" fill="#78992B" />
    </svg>
  )
}

function IconLamp() {
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="inline-block align-middle mx-1 shrink-0"
    >
      <circle cx="14" cy="14" r="14" fill="#78992B" />
      <path d="M14 7a4 4 0 0 1 4 4c0 2-1.5 3.5-2.5 4.5H12.5C11.5 14.5 10 13 10 11a4 4 0 0 1 4-4z" fill="white" />
      <rect x="12" y="16" width="4" height="1.5" rx="0.5" fill="white" />
      <rect x="12.5" y="18" width="3" height="1.5" rx="0.5" fill="white" />
    </svg>
  )
}

function IconTable() {
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="inline-block align-middle mx-1 shrink-0"
    >
      <circle cx="14" cy="14" r="14" fill="#78992B" />
      <rect x="7" y="13" width="14" height="2.5" rx="1" fill="white" />
      <rect x="8.5" y="10" width="11" height="2" rx="1" fill="white" />
      <rect x="9" y="15.5" width="2" height="4" rx="1" fill="white" />
      <rect x="17" y="15.5" width="2" height="4" rx="1" fill="white" />
    </svg>
  )
}

export default function VerhuurIntro() {
  return (
    <section className="bg-ivory py-16 md:py-24 px-6 md:px-12 border-t border-grey">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

        {/* Links: grote H2 met inline iconen */}
        <div>
          <h2 className="text-[32px] leading-[38px] tracking-[-0.03em] md:text-h2 font-dm-sans text-black">
            Brengen jullie de vlaggetjes en het lekkers mee? Dan zorgen onze basisvoorzieningen
            {' '}<IconCastle />{' '}<IconLamp />{' '}<IconTable />{' '}
            ervoor dat het je aan niets ontbreekt.
          </h2>
        </div>

        {/* Rechts: body tekst */}
        <div className="flex flex-col gap-5 md:pt-2">
          <p className="text-body1 font-dm-sans text-black/80">
            Stel je een zonovergoten ochtend voor waarin je kinderen zich uitleven in een prachtige
            speeltuin, omringd door het geluid van lachende vrienden en vrolijke vlaggetjes. Zo ziet
            jullie feestje er misschien binnenkort wel uit.
          </p>
          <p className="text-body2 font-dm-sans text-black/60">
            Onze speeltuin biedt de perfecte locatie voor een onvergetelijk kinderfeestje, waar
            kinderen zich kunnen verliezen in eindeloze avonturen. Als je jaarlid bent kun je de
            speeltuin huren, waarbij je exclusief gebruik maakt van de speeltuin tot 13:00 uur.{' '}
            <a href="/speelregels" className="underline hover:text-black/80 transition-colors">
              Kijk hier voor het complete huurreglement.
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
