import Image from 'next/image'

const cards = [
  {
    image: '/images/feature-family.jpg',
    label: 'Familievriendelijk',
    body: 'Speeltuin Burcht ter Cleeff is ingericht voor alle leeftijden. Van peuters tot grootouders — iedereen vindt hier zijn plek.',
    alt: 'Families genieten samen van de speeltuin',
  },
  {
    image: '/images/feature-location.jpg',
    label: 'Unieke locatie',
    body: 'Geniet van het spelen in en rondom een middeleeuws kasteelterrein, omringd door natuur en geschiedenis.',
    alt: 'Het historische kasteelterrein van Burcht ter Cleeff',
  },
  {
    image: '/images/feature-facilities.jpg',
    label: 'Veel voorzieningen',
    body: 'Volop speeltoestellen, picknickplaatsen, sanitair en een kiosk voor versnaperingen. Een dagje uit is hier compleet.',
    alt: 'Speeltoestellen en voorzieningen in de speeltuin',
  },
]

export default function FeatureCards() {
  return (
    <section className="bg-ivory py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-h2 font-walsheim text-black mb-10 md:mb-14 max-w-2xl">
          Avontuur en ontspanning in Speeltuin Burcht ter Cleeff
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card) => (
            <article key={card.label} className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-grey">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sub1 font-walsheim font-medium text-black">{card.label}</p>
                <p className="text-body2 font-walsheim text-black/70">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
