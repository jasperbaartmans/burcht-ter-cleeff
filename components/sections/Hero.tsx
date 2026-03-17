import Image from 'next/image'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'

export default function Hero() {
  return (
    <section className="relative w-full h-svh min-h-[500px] overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Content — twee kolommen onderaan */}
      <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-[73px]">
        <div className="max-w-[1360px] mx-auto w-full px-6 md:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">

          {/* H1 + badge — bovenaan op mobiel, rechts op desktop */}
          <div className="flex flex-col items-start gap-3 md:gap-4 md:max-w-[580px] order-1 md:order-2">
            <h1
              className="text-[36px] leading-[40px] tracking-[-0.03em] md:text-h1 font-dm-sans text-white"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.50)' }}
            >
              De speeltuin voor ouderwets plezier en avontuur.
            </h1>
            <StatusBadge status="open" label="Open tot 18:00u" />
          </div>

          {/* Koop een kaartje — onderaan op mobiel, links op desktop */}
          <div className="shrink-0 order-2 md:order-1">
            <Link
              href="/dagticket"
              className="flex items-center gap-3 text-white group"
            >
              <span className="w-12 h-12 rounded-full border border-white group-hover:bg-forest group-hover:border-forest flex items-center justify-center shrink-0 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-body2 font-dm-sans">Koop een kaartje</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
