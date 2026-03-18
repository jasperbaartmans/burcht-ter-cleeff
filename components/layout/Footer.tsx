import LogoIcon from '@/components/ui/LogoIcon'
import StatusBadgeLive from '@/components/ui/StatusBadgeLive'
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
          <FlagIllustration />
        </div>

        {/* Right: info */}
        <div className="flex flex-col gap-8 md:w-1/2 py-4">

          {/* Newsletter — mobile only (desktop is in bottom bar) */}
          <div className="md:hidden">
            <FooterNewsletter />
          </div>

          {/* Logo */}
          <div className="hidden md:flex items-center gap-2.5">
            <LogoIcon className="text-white" />
            <span className="text-[20px] font-dm-sans font-medium tracking-[-0.6px] text-white uppercase leading-none">
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
                    href="mailto:info@burchttercleeff.nl"
                    className="hover:text-white/70 transition-colors"
                  >
                    info@burchttercleeff.nl
                  </a>
                  <a
                    href="mailto:verhuur@burchttercleeff.nl"
                    className="hover:text-white/70 transition-colors"
                  >
                    verhuur@burchttercleeff.nl
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
          <StatusBadgeLive className="w-full justify-center bg-linen border-linen text-forest md:w-auto md:justify-start md:bg-transparent md:border-forest" />
          <div className="flex-1" />
          <div className="hidden md:block">
            <FooterNewsletter />
          </div>
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
      <span className="text-body3 font-dm-sans text-white/50 w-28 shrink-0">{label}</span>
      <span className="text-body2 font-dm-sans leading-snug">{value}</span>
    </div>
  )
}

function FlagIllustration() {
  return (
    <svg
      width="492"
      height="541"
      viewBox="0 0 492 541"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Vlag Burcht ter Cleeff"
      className="w-full h-auto max-h-full"
    >
      <path d="M25 23H7V541H25V23Z" fill="#B07826"/>
      <path d="M260.662 115.747C173.741 139.687 167.386 137.027 149.448 64.3888C147.5 56.4088 138.993 51.9073 131.305 54.7719L57.7086 82.5995C49.201 85.771 38.9508 77.2795 40.8983 66.8442C44.2809 48.1219 47.0485 31.1389 55.2486 27.7628C94.7119 11.9051 138.275 -0.780963 179.993 0.0374953C192.191 0.24211 203.774 34.6174 216.177 60.6034C219.047 66.6396 225.914 69.6065 232.372 67.765C310.171 45.3596 314.168 48.1219 323.496 137.845C324.316 145.723 331.696 151.452 339.486 150.02C389.61 141.017 441.681 107.051 486.064 136.413C495.494 142.654 493.239 157.284 482.477 160.762C440.246 174.267 397.605 186.953 356.604 203.424C292.336 229.308 278.088 221.021 278.703 150.941C278.703 143.472 278.498 135.902 278.19 128.229C277.78 119.43 269.273 113.292 260.765 115.542L260.662 115.747Z" fill="#B07826"/>
      <path d="M15.9903 27.4567C24.8215 27.4567 31.9806 22.006 31.9806 15.2822C31.9806 8.55833 24.8215 3.10759 15.9903 3.10759C7.15911 3.10759 0 8.55833 0 15.2822C0 22.006 7.15911 27.4567 15.9903 27.4567Z" fill="#B07826"/>
    </svg>
  )
}
