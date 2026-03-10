import Image from 'next/image'
import StatusBadge from '@/components/ui/StatusBadge'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[560px] overflow-hidden">
      {/* Achtergrond foto */}
      <Image
        src="/images/hero.jpg"
        alt="Speeltuin Burcht ter Cleeff — kinderen spelen op het kasteel"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Donkere overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-10 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-h1 font-walsheim text-white mb-8 md:mb-10 leading-none">
            De speeltuin voor ouderwets plezier en avontuur.
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <StatusBadge status="open" label="Open tot 18:00u" />
            <Button as="link" href="/dagticket" variant="arrow" size="lg" aria-label="Koop een kaartje" />
            <span className="text-white text-body2 font-walsheim">Koop een kaartje</span>
          </div>
        </div>
      </div>
    </section>
  )
}
