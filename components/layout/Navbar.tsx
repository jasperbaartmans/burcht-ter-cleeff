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
    <nav className="absolute top-0 left-0 right-0 z-50">
      {/* Desktop */}
      <div className="max-w-[1360px] mx-auto px-10 h-[69px] flex items-center relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <svg
            width="34"
            height="40"
            viewBox="0 0 34 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="3" y="22" width="28" height="16" fill="white" />
            <rect x="3" y="16" width="5" height="8" fill="white" />
            <rect x="10" y="16" width="5" height="8" fill="white" />
            <rect x="19" y="16" width="5" height="8" fill="white" />
            <rect x="26" y="16" width="5" height="8" fill="white" />
            <rect x="14" y="28" width="6" height="10" fill="transparent" />
          </svg>
          <span className="text-body3 font-walsheim font-medium tracking-widest text-white uppercase">
            Burcht ter Cleeff
          </span>
        </Link>

        {/* Nav links — absoluut gecentreerd */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-body2 font-walsheim relative pb-1 transition-colors hover:text-white ${
                  isActive ? 'text-white' : 'text-white/70'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Inloggen */}
        <div className="hidden md:flex items-center ml-auto">
          <Link
            href="/mijn-omgeving"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-body2 font-walsheim">Inloggen</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 ml-auto"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-200 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-200 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[69px] bg-black z-40 flex flex-col px-6 pt-8 gap-6">
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
              <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>Inloggen</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
