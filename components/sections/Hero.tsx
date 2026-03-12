import Image from 'next/image'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
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

      {/* Content — onderkant van de hero */}
      <div className="absolute inset-0 flex flex-col justify-end px-10 pb-[73px]">
        <div className="flex items-end justify-between gap-8">

          {/* Links: CTA rij */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dagticket"
              className="flex items-center gap-3 text-white group"
            >
              <span className="w-12 h-12 rounded-full border border-white flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
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
            <StatusBadge status="open" label="Open tot 18:00u" />
          </div>

          {/* Rechts: H1 */}
          <h1
            className="text-h1 font-walsheim text-white max-w-[580px] text-right"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.50)' }}
          >
            De speeltuin voor ouderwets plezier en avontuur.
          </h1>

        </div>
      </div>
    </section>
  )
}
