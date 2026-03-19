import type { HomePageData } from '@/lib/sanity/queries'

interface Props {
  data?: HomePageData['quote']
}

export default function Quote({ data }: Props) {
  const h2 = data?.h2 ?? 'Kinderen spelen en leren in een historische omgeving met diverse speeltoestellen, terwijl ouders ontspannen in het groen.'
  const body1 = data?.body1 ?? 'Een fantastische speelplek voor kinderen van alle leeftijden. Deze speeltuin, gelegen in een prachtige historische omgeving, biedt een breed scala aan speeltoestellen en activiteiten. Terwijl kinderen zich vermaken en nieuwe vrienden maken, kunnen ouders ontspannen in de groene en rustige omgeving.'
  const body2 = data?.body2 ?? 'Het beste van alles? Een dagje uit naar Burcht ter Cleeff is niet alleen leuk, maar ook leerzaam, want de speeltuin biedt een unieke kans om spelenderwijs over geschiedenis te leren. Het is zo simpel: plezier, ontspanning en educatie, allemaal op één plek.'

  return (
    <section className="bg-ivory py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-8">
        {/* Rij 1: h2 spanning 10/12 kolommen (~83% breedte) */}
        <h2 className="col-span-12 md:col-span-10 text-h2 font-dm-sans text-black leading-tight">
          {h2}
        </h2>

        {/* Rij 2: body tekst in rechterkolom (cols 7–12) */}
        <div className="col-span-12 md:col-start-7 md:col-span-6 flex flex-col gap-3 mt-8 md:mt-0">
          <p className="text-body1 font-dm-sans text-black">{body1}</p>
          <p className="text-body1 font-dm-sans text-black">{body2}</p>
        </div>
      </div>
    </section>
  )
}
