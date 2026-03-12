import Image from 'next/image'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'

export default function Hero() {
  return (
    <section className="relative w-full h-[900px] overflow-hidden">
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
      <div className="absolute inset-0 flex flex-col justify-end pb-[73px]">
        <div className="max-w-[1360px] mx-auto w-full px-10 flex items-end justify-between gap-8">

          {/* Links: Koop een kaartje */}
          <div className="shrink-0">
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
              <span className="text-body2 font-walsheim">Koop een kaartje</span>
            </Link>
          </div>

          {/* Rechts: H1 + badge */}
          <div className="flex flex-col items-start gap-4 max-w-[580px]">
            <h1
              className="text-h1 font-walsheim text-white"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.50)' }}
            >
              De speeltuin voor ouderwets plezier en avontuur.
            </h1>
            <StatusBadge status="open" label="Open tot 18:00u" />
          </div>

        </div>
      </div>
    </section>
  )
}
