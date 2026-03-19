import Image from 'next/image'
import Button from '@/components/ui/Button'
import { urlFor } from '@/lib/sanity/image'
import type { HomePageData } from '@/lib/sanity/queries'

interface Props {
  data?: HomePageData['verhuurCTA']
}

const fallbackBullets = [
  'Exclusieve huur van het terrein',
  'Capaciteit tot 500 personen',
  'Catering & decoratie mogelijk',
]

export default function VerhuurCTA({ data }: Props) {
  const label = data?.label ?? 'Voor groepen & bedrijven'
  const h3 = data?.h3 ?? 'Verhuurmogelijkheden'
  const body = data?.body ?? 'Organiseer uw bedrijfsuitje, verjaardag of schoolreisje op het unieke terrein van Burcht ter Cleeff. Wij zorgen voor een onvergetelijke dag.'
  const bullets = data?.bullets?.length ? data.bullets : fallbackBullets

  const imgSrc =
    data?.image && typeof data.image === 'object' && '_type' in data.image
      ? urlFor(data.image).width(800).height(600).url()
      : '/images/verhuur.jpg'

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Foto links */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-grey">
            <Image
              src={imgSrc}
              alt="Verhuur van het terrein van Speeltuin Burcht ter Cleeff voor evenementen"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Tekst rechts */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-body3 font-dm-sans text-black/50 uppercase tracking-wider mb-3">
                {label}
              </p>
              <h3 className="text-h3 font-dm-sans font-medium text-black mb-4">
                {h3}
              </h3>
              <p className="text-body1 font-dm-sans text-black">
                {body}
              </p>
            </div>
            <ul className="space-y-2 text-body2 font-dm-sans text-black">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
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
