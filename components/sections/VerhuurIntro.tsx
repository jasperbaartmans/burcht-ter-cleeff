import { SymbolBadge } from '@/components/ui/symbols'

interface Props {
  data?: {
    body1?: string
    body2?: string
  }
}

export default function VerhuurIntro({ data }: Props) {
  const body1 = data?.body1 ?? 'Stel je een zonovergoten ochtend voor waarin je kinderen zich uitleven in een prachtige speeltuin, omringd door het geluid van lachende vrienden en vrolijke vlaggetjes. Zo ziet jullie feestje er misschien binnenkort wel uit.'
  const body2 = data?.body2 ?? 'Onze speeltuin biedt de perfecte locatie voor een onvergetelijk kinderfeestje, waar kinderen zich kunnen verliezen in eindeloze avonturen. Als je jaarlid bent kun je de speeltuin huren, waarbij je exclusief gebruik maakt van de speeltuin tot 13:00 uur.'

  return (
    <section className="bg-ivory py-16 md:py-24 px-6 md:px-12 border-t border-grey">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

        {/* Links: grote H2 met inline iconen */}
        <div>
          <h2 className="text-[32px] leading-[38px] tracking-[-0.03em] md:text-h2 font-dm-sans text-black">
            Brengen jullie de vlaggetjes en het lekkers mee? Dan zorgen onze basisvoorzieningen
            {' '}<SymbolBadge name="castle" size={28} />{' '}<SymbolBadge name="lamp" size={28} />{' '}<SymbolBadge name="picnicTable" size={28} />{' '}
            ervoor dat het je aan niets ontbreekt.
          </h2>
        </div>

        {/* Rechts: body tekst */}
        <div className="flex flex-col gap-5 md:pt-2">
          <p className="text-body1 font-dm-sans text-black/80">
            {body1}
          </p>
          <p className="text-body2 font-dm-sans text-black/60">
            {body2}{' '}
            <a href="/speelregels" className="underline hover:text-black/80 transition-colors">
              Kijk hier voor het complete huurreglement.
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
