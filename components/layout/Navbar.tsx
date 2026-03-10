'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Ontdek' },
  { href: '/verhuur', label: 'Verhuur' },
  { href: '/speelregels', label: 'Speelregels' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="relative z-50 bg-ivory">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {/* Kasteel riddericoon SVG placeholder */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="4" y="18" width="24" height="12" fill="#789928" />
            <rect x="4" y="14" width="4" height="6" fill="#789928" />
            <rect x="10" y="14" width="4" height="6" fill="#789928" />
            <rect x="18" y="14" width="4" height="6" fill="#789928" />
            <rect x="24" y="14" width="4" height="6" fill="#789928" />
            <rect x="13" y="22" width="6" height="8" fill="#F3EEE2" />
          </svg>
          <span className="text-sub2 font-walsheim font-medium tracking-tight text-black uppercase">
            Burcht ter Cleeff
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-body2 relative pb-0.5 transition-colors hover:text-forest ${
                  isActive ? 'text-black' : 'text-black/70'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-forest rounded-full" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Desktop: Inloggen button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/mijn-omgeving"
            className="flex items-center gap-1.5 text-body2 text-black/70 hover:text-black transition-colors"
          >
            <span>→</span>
            <span>Inloggen</span>
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-200 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-200 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black z-40 flex flex-col px-6 pt-8 gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-h3 font-walsheim transition-colors ${
                  isActive ? 'text-forest' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="mt-4 pt-4 border-t border-white/20">
            <Link
              href="/mijn-omgeving"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-white/70 text-body2 hover:text-white transition-colors"
            >
              <span>→</span>
              <span>Inloggen</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
