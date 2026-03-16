import LogoIcon from '@/components/ui/LogoIcon'
import StatusBadge from '@/components/ui/StatusBadge'
import FlagIcon from '@/components/ui/FlagIcon'
import FooterNewsletter from './FooterNewsletter'

export default function Footer() {
  return (
    <footer className="bg-sienna text-white">
      {/* Kantelen top border */}
      <div className="flex overflow-hidden">
        {Array.from({ length: 54 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-5 ${i % 2 === 0 ? 'bg-white' : 'bg-transparent'}`}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="max-w-[1360px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-0">

        {/* Left: illustratie placeholder */}
        <div className="hidden md:flex w-1/2 items-end justify-start">
          <CastleIllustration />
        </div>

        {/* Right: info */}
        <div className="flex flex-col gap-8 md:w-1/2 py-4">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <LogoIcon className="text-white" />
            <span className="text-[20px] font-walsheim font-medium tracking-[-0.6px] text-white uppercase leading-none">
              Burcht ter Cleeff
            </span>
          </div>

          {/* Info tabel */}
          <div className="flex flex-col divide-y divide-white/10">
            <InfoRow
              label="Openingstijden"
              value="Iedere dag vanaf 09:00 tot 18:00 uur, tenzij anders vermeld op de website ivm verhuur"
            />
            <InfoRow label="Adres" value="Van Dortstraat 3, 2023 JN Haarlem" />
            <InfoRow label="Postadres" value="Van Dortstraat 40, 2023 JN Haarlem" />
            <InfoRow
              label="Contact"
              value={
                <span className="flex flex-col gap-1">
                  <a
                    href="mailto:info@burchtercleeff.nl"
                    className="hover:text-white/70 transition-colors"
                  >
                    info@burchtercleeff.nl
                  </a>
                  <a
                    href="mailto:verhuur@burchtercleeff.nl"
                    className="hover:text-white/70 transition-colors"
                  >
                    verhuur@burchtercleeff.nl
                  </a>
                </span>
              }
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="max-w-[1360px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center gap-4">
          <StatusBadge status="open" label="Open tot 18:00u" variant="outline" />
          <div className="flex-1" />
          <FooterNewsletter />
        </div>
      </div>

      {/* Vlag decoratie */}
      <div className="max-w-[1360px] mx-auto px-6 pb-4">
        <FlagIcon className="w-12 h-auto opacity-60" color="white" />
      </div>
    </footer>
  )
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-8 py-4">
      <span className="text-body3 font-helvetica text-white/50 w-28 shrink-0">{label}</span>
      <span className="text-body2 font-walsheim leading-snug">{value}</span>
    </div>
  )
}

function CastleIllustration() {
  return (
    <svg
      width="280"
      height="220"
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kasteel Burcht ter Cleeff illustratie — placeholder"
      className="opacity-80"
    >
      {/* Vlagmast */}
      <line x1="60" y1="20" x2="60" y2="80" stroke="white" strokeWidth="3" />
      {/* Vlag */}
      <polygon points="60,24 110,40 60,56" fill="white" opacity="0.9" />

      {/* Golvende banner / decoratie */}
      <path
        d="M20 140 Q50 120 80 140 Q110 160 140 140 Q170 120 200 140 Q230 160 260 140"
        stroke="#B07826"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M20 160 Q50 140 80 160 Q110 180 140 160 Q170 140 200 160 Q230 180 260 160"
        stroke="#B07826"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Kantelen */}
      {[20, 46, 72, 98, 124, 150, 176, 202, 228].map((x, i) => (
        <rect key={i} x={x} y={84} width="18" height="24" fill="white" opacity="0.8" />
      ))}

      {/* Muur */}
      <rect x="20" y="108" width="228" height="72" fill="white" opacity="0.12" />
      <rect x="20" y="108" width="228" height="72" stroke="white" strokeWidth="1.5" opacity="0.4" />

      {/* Poort */}
      <rect x="108" y="130" width="52" height="50" rx="26" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />

      {/* Ramen */}
      <rect x="38" y="118" width="28" height="36" rx="14" fill="white" opacity="0.15" stroke="white" strokeWidth="1" />
      <rect x="202" y="118" width="28" height="36" rx="14" fill="white" opacity="0.15" stroke="white" strokeWidth="1" />

      {/* Basis */}
      <rect x="14" y="180" width="240" height="12" fill="white" opacity="0.3" />
      <rect x="0" y="192" width="280" height="6" rx="3" fill="white" opacity="0.15" />
    </svg>
  )
}
