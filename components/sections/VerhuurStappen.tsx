import Image from 'next/image'
import Button from '@/components/ui/Button'

const stappen = [
  {
    nr: 1,
    titel: 'Beschikbaarheid',
    omschrijving: 'Controleer de agenda voor beschikbare data.',
  },
  {
    nr: 2,
    titel: 'Reserveren',
    omschrijving: 'Kies een ochtend en login om deze vast te leggen.',
  },
  {
    nr: 3,
    titel: 'Betaling',
    omschrijving: 'Betaal direct gemakkelijk online.',
  },
  {
    nr: 4,
    titel: 'Bevestiging',
    omschrijving: 'Ontvang een mail met een bevestiging en details.',
  },
]

export default function VerhuurStappen() {
  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[1360px] mx-auto">

        {/* Koptekst */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-[28px] leading-[34px] tracking-[-0.02em] md:text-h2 font-dm-sans text-black">
            Boek direct een datum in
          </h2>
          <p className="text-[28px] leading-[34px] tracking-[-0.02em] md:text-h2 font-dm-sans text-forest">
            4 simpele stappen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Links: foto */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-grey">
            <Image
              src="/images/schommel.jpg"
              alt="Kind op de schommel bij Burcht ter Cleeff"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Rechts: genummerde stappen + knop */}
          <div className="flex flex-col justify-center gap-0">
            <ol className="space-y-6">
              {stappen.map((stap) => (
                <li key={stap.nr} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-forest text-white text-body3 font-dm-sans flex items-center justify-center shrink-0 mt-0.5">
                    {stap.nr}
                  </span>
                  <div>
                    <p className="text-sub2 font-dm-sans text-black">{stap.titel}</p>
                    <p className="text-body2 font-dm-sans text-black/60 mt-0.5">{stap.omschrijving}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="pt-8">
              <Button as="link" href="/mijn-omgeving" variant="primary" size="md">
                Boek nu
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
