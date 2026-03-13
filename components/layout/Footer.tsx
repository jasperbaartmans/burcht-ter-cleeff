import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'
import NewsletterBar from '@/components/sections/NewsletterBar'

export default function Footer() {
  return (
    <footer className="bg-sienna text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">

          {/* Links: kasteel battlements illustratie */}
          <div className="flex-shrink-0 flex items-end">
            <CastleIllustration />
          </div>

          {/* Rechts: info kolommen */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 flex-1">

            {/* Logo + openingstijden */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="4" y="18" width="24" height="12" fill="white" />
                  <rect x="4" y="14" width="4" height="6" fill="white" />
                  <rect x="10" y="14" width="4" height="6" fill="white" />
                  <rect x="18" y="14" width="4" height="6" fill="white" />
                  <rect x="24" y="14" width="4" height="6" fill="white" />
                  <rect x="13" y="22" width="6" height="8" fill="#853F21" />
                </svg>
                <span className="text-sub2 font-walsheim font-medium uppercase tracking-tight">
                  Burcht ter Cleeff
                </span>
              </div>

              <div>
                <p className="text-body3 font-helvetica text-white/70 uppercase tracking-wider mb-2">
                  Openingstijden
                </p>
                <ul className="space-y-1 text-body2 font-walsheim">
                  <li>Ma–vr: 10:00–18:00</li>
                  <li>Za–zo: 09:00–18:00</li>
                  <li className="text-white/60 text-body3 font-helvetica">
                    Gesloten op feestdagen
                  </li>
                </ul>
              </div>
            </div>

            {/* Adres */}
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <p className="text-body3 font-helvetica text-white/70 uppercase tracking-wider mb-2">
                  Bezoekadres
                </p>
                <address className="not-italic text-body2 font-walsheim leading-relaxed">
                  Burcht ter Cleeff<br />
                  Tolweg 9<br />
                  1967 NG Heemskerk
                </address>
              </div>
              <div>
                <p className="text-body3 font-helvetica text-white/70 uppercase tracking-wider mb-2">
                  Postadres
                </p>
                <address className="not-italic text-body2 font-walsheim leading-relaxed">
                  Postbus 123<br />
                  1960 AA Heemskerk
                </address>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <p className="text-body3 font-helvetica text-white/70 uppercase tracking-wider mb-2">
                  Contact
                </p>
                <ul className="space-y-1 text-body2 font-walsheim">
                  <li>
                    <a
                      href="mailto:info@burchtercleeff.nl"
                      className="hover:text-white/80 transition-colors underline underline-offset-2"
                    >
                      info@burchtercleeff.nl
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:verhuur@burchtercleeff.nl"
                      className="hover:text-white/80 transition-colors underline underline-offset-2"
                    >
                      verhuur@burchtercleeff.nl
                    </a>
                  </li>
                </ul>
              </div>
              <nav>
                <p className="text-body3 font-helvetica text-white/70 uppercase tracking-wider mb-2">
                  Navigatie
                </p>
                <ul className="space-y-1 text-body2 font-walsheim">
                  {[
                    { href: '/', label: 'Ontdek' },
                    { href: '/verhuur', label: 'Verhuur' },
                    { href: '/speelregels', label: 'Speelregels' },
                    { href: '/contact', label: 'Contact' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-white/80 transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <StatusBadge status="open" label="Open tot 18:00u" variant="outline" />
          <NewsletterBar />
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <p className="text-body3 font-helvetica text-white/40">
          © {new Date().getFullYear()} Stichting Burcht ter Cleeff. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  )
}

function CastleIllustration() {
  return (
    <svg
      width="120"
      height="160"
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kasteel Burcht ter Cleeff illustratie"
    >
      {/* Flagpole */}
      <line x1="60" y1="0" x2="60" y2="40" stroke="white" strokeWidth="2" />
      {/* Flag */}
      <polygon points="60,4 90,14 60,24" fill="white" opacity="0.9" />

      {/* Battlements (kantelen) */}
      <rect x="10" y="40" width="12" height="16" fill="white" opacity="0.85" />
      <rect x="30" y="40" width="12" height="16" fill="white" opacity="0.85" />
      <rect x="50" y="40" width="12" height="16" fill="white" opacity="0.85" />
      <rect x="70" y="40" width="12" height="16" fill="white" opacity="0.85" />
      <rect x="90" y="40" width="12" height="16" fill="white" opacity="0.85" />

      {/* Main wall top */}
      <rect x="10" y="56" width="100" height="4" fill="white" opacity="0.7" />

      {/* Main body */}
      <rect x="10" y="60" width="100" height="60" fill="white" opacity="0.15" />
      <rect x="10" y="60" width="100" height="60" stroke="white" strokeWidth="1.5" opacity="0.6" />

      {/* Gate */}
      <rect x="45" y="90" width="30" height="30" rx="15" fill="white" opacity="0.2" />
      <rect x="45" y="90" width="30" height="30" rx="15" stroke="white" strokeWidth="1.5" opacity="0.5" />

      {/* Windows */}
      <rect x="20" y="72" width="16" height="20" rx="8" fill="white" opacity="0.2" stroke="white" strokeWidth="1" />
      <rect x="84" y="72" width="16" height="20" rx="8" fill="white" opacity="0.2" stroke="white" strokeWidth="1" />

      {/* Base */}
      <rect x="5" y="120" width="110" height="8" fill="white" opacity="0.4" />

      {/* Ground */}
      <rect x="0" y="128" width="120" height="4" rx="2" fill="white" opacity="0.2" />
    </svg>
  )
}
