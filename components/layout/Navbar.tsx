'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser, SignOutButton, SignInButton } from '@clerk/nextjs'
import LogoIcon from '@/components/ui/LogoIcon'

const navLinks = [
  { href: '/', label: 'Ontdek' },
  { href: '/verhuur', label: 'Verhuur' },
  { href: '/speelregels', label: 'Speelregels' },
  { href: '/contact', label: 'Contact' },
]

const userIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const arrowIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()

  const displayName = isSignedIn
    ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.emailAddresses[0]?.emailAddress
    : null

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      {/* Desktop */}
      <div className="max-w-[1360px] mx-auto px-10 h-[69px] flex items-stretch relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 self-center">
          <LogoIcon className="text-white" />
          <span className="text-[20px] font-walsheim font-medium tracking-[-0.6px] text-white uppercase leading-none">
            Burcht ter Cleeff
          </span>
        </Link>

        {/* Nav links — absoluut gecentreerd */}
        <div className="hidden md:flex items-stretch gap-9 absolute left-1/2 -translate-x-1/2 h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center text-body2 font-walsheim transition-colors hover:text-white border-b-4 ${
                  isActive
                    ? 'text-white border-white'
                    : 'text-white/70 border-transparent'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Inloggen / Account */}
        <div className="hidden md:flex items-center ml-auto self-center gap-4">
          {isSignedIn ? (
            <>
              <Link
                href="/mijn-omgeving"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-forest border border-forest flex items-center justify-center shrink-0 text-white">
                  {userIcon}
                </span>
                <span className="text-body2 font-walsheim text-white">{displayName}</span>
              </Link>
              <SignOutButton redirectUrl="/">
                <button className="text-body3 font-walsheim text-white/50 hover:text-white transition-colors">
                  Uitloggen
                </button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="redirect">
              <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full border border-white/40 group-hover:bg-forest group-hover:border-forest flex items-center justify-center shrink-0 transition-colors">
                  {arrowIcon}
                </span>
                <span className="text-body2 font-walsheim">Inloggen</span>
              </button>
            </SignInButton>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-8 h-8 ml-auto self-center"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M8 8L24 24M24 8L8 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <>
              <span className="block w-6 h-0.5 bg-white absolute" style={{ marginTop: '-8px' }} />
              <span className="block w-6 h-0.5 bg-white absolute" />
              <span className="block w-6 h-0.5 bg-white absolute" style={{ marginTop: '8px' }} />
            </>
          )}
        </button>
      </div>

      {/* Scheidingslijn */}
      <div className="hidden md:block h-px bg-white opacity-50 max-w-[1360px] mx-auto w-full" />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-sienna z-40 flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 h-[69px] shrink-0">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
              <LogoIcon className="text-white" />
              <span className="text-[20px] font-walsheim font-medium tracking-[-0.6px] text-white uppercase leading-none">
                Burcht ter Cleeff
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Menu sluiten"
              className="flex items-center justify-center w-8 h-8"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M8 8L24 24M24 8L8 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col px-6 pt-8 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-h3 font-walsheim text-white/60 hover:text-white transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Acties */}
          <div className="flex flex-col px-6 pt-10 gap-4">
            {isSignedIn ? (
              <>
                <Link
                  href="/mijn-omgeving"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-white text-body2 font-walsheim"
                >
                  <span className="w-10 h-10 rounded-full bg-forest flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.5" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  {displayName}
                </Link>
                <SignOutButton redirectUrl="/">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-white/60 text-body2 font-walsheim"
                  >
                    Uitloggen
                  </button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="redirect">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-white text-body2 font-walsheim"
                >
                  <span className="w-10 h-10 rounded-full bg-caramel flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Inloggen
                </button>
              </SignInButton>
            )}
            <Link
              href="/dagticket"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-white text-body2 font-walsheim"
            >
              <span className="w-10 h-10 rounded-full bg-caramel flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Koop een kaartje
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
