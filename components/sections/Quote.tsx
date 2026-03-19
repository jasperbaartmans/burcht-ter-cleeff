import type { HomePageData } from '@/lib/sanity/queries'
import { SymbolBadge } from '@/components/ui/symbols'

interface Props {
  data?: HomePageData['quote']
}

export default function Quote({ data }: Props) {
  const h2 = data?.h2 ?? 'Kinderen spelen en leren in een historische omgeving met diverse speeltoestellen, terwijl ouders ontspannen in het groen.'
  const body1 = data?.body1 ?? 'Bij Burcht ter Cleeff geloven we dat spelen meer is dan vermaak. Het is de manier waarop kinderen de wereld ontdekken, vriendschappen sluiten en zichzelf uitdagen.'
  const body2 = data?.body2 ?? 'Onze speeltuin biedt een unieke combinatie van historische omgeving en creatieve speelruimte. Laat uw kind rennen, klimmen, dromen — terwijl u geniet van de rust van ons prachtige kasteelterrein.'

  return (
    <section className="bg-ivory py-16 md:py-24 px-6 md:px-12 border-t border-grey">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Links: decoratieve iconen + H2 */}
        <div>
          <div className="flex gap-2 mb-4" aria-hidden="true">
            <SymbolBadge name="star" size={28} />
            <SymbolBadge name="leaf" size={28} />
            <SymbolBadge name="castle" size={28} />
          </div>
          <h2 className="text-h2 font-dm-sans text-black leading-tight">
            {h2}
          </h2>
        </div>

        {/* Rechts: body tekst */}
        <div className="flex flex-col gap-4 md:pt-2">
          <p className="text-body1 font-dm-sans text-black">{body1}</p>
          <p className="text-body2 font-dm-sans text-black">{body2}</p>
        </div>
      </div>
    </section>
  )
}
