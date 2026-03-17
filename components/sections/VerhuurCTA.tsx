import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function VerhuurCTA() {
  return (
    <section className="bg-ivory py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Foto links */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-grey">
            <Image
              src="/images/verhuur.jpg"
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
                Voor groepen &amp; bedrijven
              </p>
              <h3 className="text-h3 font-dm-sans font-medium text-black mb-4">
                Verhuurmogelijkheden
              </h3>
              <p className="text-body1 font-dm-sans text-black/70">
                Organiseer uw bedrijfsuitje, verjaardag of schoolreisje op het unieke terrein
                van Burcht ter Cleeff. Wij zorgen voor een onvergetelijke dag.
              </p>
            </div>
            <ul className="space-y-2 text-body2 font-dm-sans text-black/60">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" />
                Exclusieve huur van het terrein
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" />
                Capaciteit tot 500 personen
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0" />
                Catering &amp; decoratie mogelijk
              </li>
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
