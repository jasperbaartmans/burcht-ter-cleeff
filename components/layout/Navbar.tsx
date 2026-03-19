'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useUser } from '@/components/providers/UserProvider'
import { createClient } from '@/lib/supabase/client'
import LogoIcon from '@/components/ui/LogoIcon'
function ArrowRightIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" />
    </svg>
  )
}
function UserIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    </svg>
  )
}
function XIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

const navLinks = [
  { href: '/', label: 'Ontdek' },
  { href: '/verhuur', label: 'Verhuur' },
  { href: '/speelregels', label: 'Speelregels' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()

  const displayName = user
    ? [user.user_metadata?.firstName, user.user_metadata?.lastName].filter(Boolean).join(' ') || user.email
    : null

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      {/* Desktop */}
      <div className="max-w-[1360px] mx-auto px-10 h-[69px] flex items-stretch relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 self-center">
          <LogoIcon className="text-white" />
          <span className="text-[20px] font-dm-sans font-medium tracking-[-0.6px] text-white uppercase leading-none">
            Burcht ter Cleeff
          </span>
        </Link>

        {/* Nav links — absoluut gecentreerd */}
        <div className="hidden md:flex items-stretch gap-8 absolute left-1/2 -translate-x-1/2 h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center text-body2 font-dm-sans transition-colors hover:text-white border-b-4 [text-shadow:0px_1px_3px_rgba(0,0,0,0.5)] ${
                  isActive
                    ? 'text-white border-white'
                    : 'text-white border-transparent'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Inloggen / Account */}
        <div className="hidden md:flex items-center ml-auto self-center gap-4">
          {user ? (
            <>
              <Link
                href="/mijn-omgeving"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-forest border border-forest flex items-center justify-center shrink-0 text-white">
                  <UserIcon size={16} />
                </span>
                <span className="text-body2 font-dm-sans text-white">{displayName}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="text-body3 font-dm-sans text-white/50 hover:text-white transition-colors"
              >
                Uitloggen
              </button>
            </>
          ) : (
            <Link
              href="/inloggen"
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group [text-shadow:0px_1px_3px_rgba(0,0,0,0.5)]"
            >
              <span className="w-8 h-8 rounded-2xl bg-white flex items-center justify-center shrink-0 text-forest group-hover:bg-white/90 transition-colors">
                <ArrowRightIcon size={14} />
              </span>
              <span className="text-body2 font-dm-sans">Inloggen</span>
            </Link>
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
            <XIcon size={24} />
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
              <span className="text-[20px] font-dm-sans font-medium tracking-[-0.6px] text-white uppercase leading-none">
                Burcht ter Cleeff
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Menu sluiten"
              className="flex items-center justify-center w-8 h-8"
            >
              <XIcon size={24} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col px-6 pt-8 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-h3 font-dm-sans text-white/60 hover:text-white transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Acties */}
          <div className="flex flex-col px-6 pt-10 gap-4">
            {user ? (
              <>
                <Link
                  href="/mijn-omgeving"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-white text-body2 font-dm-sans"
                >
                  <span className="w-10 h-10 rounded-full bg-forest flex items-center justify-center shrink-0 text-white">
                    <UserIcon size={18} />
                  </span>
                  {displayName}
                </Link>
                <button
                  onClick={() => { setMenuOpen(false); handleSignOut() }}
                  className="flex items-center gap-3 text-white/60 text-body2 font-dm-sans"
                >
                  Uitloggen
                </button>
              </>
            ) : (
              <Link
                href="/inloggen"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-white text-body2 font-dm-sans"
              >
                <span className="w-10 h-10 rounded-full bg-caramel flex items-center justify-center shrink-0 text-white">
                  <ArrowRightIcon size={18} />
                </span>
                Inloggen
              </Link>
            )}
            <Link
              href="/dagticket"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-white text-body2 font-dm-sans"
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
