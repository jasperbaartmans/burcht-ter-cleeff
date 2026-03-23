interface Props {
  data?: {
    body1?: string
    body2?: string
  }
}

export default function VerhuurIntro({ data }: Props) {
  const body1 = data?.body1 ?? 'Burcht ter Cleeff is te huur voor groepen, scholen, verenigingen en particulieren. De speeltuin biedt een unieke omgeving voor kinderfeestjes, schoolreisjes en andere activiteiten.'
  const body2 = data?.body2 ?? 'Met ruimte voor groepen tot 150 personen en een prachtige ligging in de Schoterveense polder is dit de perfecte locatie voor jouw evenement. Neem contact op voor beschikbaarheid en tarieven.'

  return (
    <section className="bg-ivory py-16 md:py-24 px-6 md:px-10 border-t border-grey">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-8">

        <h2 className="col-span-12 md:col-span-10 text-h2 font-dm-sans text-black leading-tight">
          Brengen jullie de vlaggetjes en het lekkers mee? Dan zorgen onze basisvoorzieningen ervoor dat het je aan niets ontbreekt.
        </h2>

        <div className="col-span-12 md:col-start-7 md:col-span-6 flex flex-col gap-3 mt-8 md:mt-12">
          <p className="text-body1 font-dm-sans text-black">{body1}</p>
          <p className="text-body1 font-dm-sans text-black">
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
