import Image from 'next/image'
import Button from '@/components/ui/Button'
import { urlFor } from '@/lib/sanity/image'
import type { HomePageData } from '@/lib/sanity/queries'

interface Props {
  data?: HomePageData['verhuurCTA']
}

export default function VerhuurCTA({ data }: Props) {
  const h3 = data?.h3 ?? 'Verhuurmogelijkheden'
  const body1 = data?.body ?? 'Stel je een zonovergoten ochtend voor waarin je kinderen zich uitleven in een prachtige speeltuin, omringd door het geluid van lachende vrienden en vrolijke vlaggetjes. Zo ziet jullie feestje er misschien binnenkort wel uit. Onze speeltuin biedt de perfecte locatie voor een gezellig kinderfeestje, waar kinderen zich kunnen verliezen in eindeloze avonturen.'
  const body2 = data?.body2 ?? 'Je kunt de speeltuin huren, waarbij je exclusief gebruik maakt van de speeltuin tot 13:00 uur.'

  const imgSrc =
    data?.image && typeof data.image === 'object' && '_type' in data.image
      ? urlFor(data.image).width(685).height(800).url()
      : '/images/verhuur.jpg'

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Foto links — staand formaat, zelfde afronding als overige foto's */}
          <div className="relative aspect-[6/7] rounded-3xl overflow-hidden bg-grey">
            <Image
              src={imgSrc}
              alt="Verhuur van het terrein van Speeltuin Burcht ter Cleeff voor evenementen"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Tekst rechts — 48px lager dan afbeelding-top conform Figma */}
          <div className="flex flex-col gap-5 md:pt-12">
            <h3 className="text-h3 font-dm-sans font-medium text-black">
              {h3}
            </h3>
            <div className="flex flex-col gap-3">
              <p className="text-body1 font-dm-sans text-black">{body1}</p>
              <p className="text-body1 font-dm-sans text-black">{body2}</p>
            </div>
            <div className="pt-2">
              <Button as="link" href="/verhuur" variant="primary" size="md">
                Bekijk de mogelijkheden
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
