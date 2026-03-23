'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useUser } from '@/components/providers/UserProvider'
import { createClient } from '@/lib/supabase/client'
import LogoIcon from '@/components/ui/LogoIcon'
import { ui, t, type Locale } from '@/lib/i18n/translations'

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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()

  const isEnglish = pathname.startsWith('/en')
  const locale: Locale = isEnglish ? 'en' : 'nl'
  const prefix = isEnglish ? '/en' : ''

  // Language toggle: strip or add /en prefix
  const toggleHref = isEnglish
    ? (pathname === '/en' ? '/' : pathname.slice(3))
    : (pathname === '/' ? '/en' : `/en${pathname}`)

  const navLinks = [
    { href: isEnglish ? '/en' : '/', label: t(ui.nav.discover, locale) },
    { href: `${prefix}/verhuur`, label: t(ui.nav.rental, locale) },
    { href: `${prefix}/speelregels`, label: t(ui.nav.rules, locale) },
    { href: `${prefix}/contact`, label: t(ui.nav.contact, locale) },
  ]

  const displayName = user
    ? [user.user_metadata?.firstName, user.user_metadata?.lastName].filter(Boolean).join(' ') || user.email
    : null

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // Language switcher pill
  const LangSwitcher = ({ className }: { className?: string }) => (
    <Link
      href={toggleHref}
      className={`flex items-center gap-1 rounded-full border border-white/30 px-2.5 py-1 text-body3 font-dm-sans text-white hover:border-white/70 transition-colors ${className ?? ''}`}
      aria-label={isEnglish ? 'Switch to Dutch' : 'Switch to English'}
    >
      <span className={isEnglish ? 'opacity-40' : 'opacity-100 font-medium'}>NL</span>
      <span className="opacity-30">/</span>
      <span className={isEnglish ? 'opacity-100 font-medium' : 'opacity-40'}>EN</span>
    </Link>
  )

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      {/* Mobiele balk — zwart afgerond pill */}
      <div className="md:hidden px-1 pt-1">
        <div className="bg-black rounded-2xl h-16 flex items-center justify-between px-4">
          <Link href={isEnglish ? '/en' : '/'} className="flex items-center gap-2.5">
            <LogoIcon className="text-white" />
            <span className="text-base font-dm-sans font-medium tracking-[-0.48px] text-white uppercase leading-none">
              Burcht ter Cleeff
            </span>
          </Link>
          <button
            className="flex items-center justify-center w-8 h-8"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? t(ui.nav.closeMenu, locale) : t(ui.nav.openMenu, locale)}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <XIcon size={24} />
            ) : (
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                <rect width="20" height="2" rx="1" fill="#78992B"/>
                <rect y="6" width="20" height="2" rx="1" fill="#78992B"/>
                <rect y="12" width="20" height="2" rx="1" fill="#78992B"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Desktop balk — transparant over hero */}
      <div className="hidden md:block">
        <div className="max-w-[1360px] mx-auto px-10 h-[69px] flex items-stretch relative">
        {/* Logo */}
        <Link href={isEnglish ? '/en' : '/'} className="flex items-center gap-2.5 shrink-0 self-center">
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

        {/* Taalschakelaar + Inloggen / Account */}
        <div className="hidden md:flex items-center ml-auto self-center gap-4">
          <LangSwitcher />
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
                {t(ui.nav.logout, locale)}
              </button>
            </>
          ) : (
            <Link
              href={`${prefix}/inloggen`}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group [text-shadow:0px_1px_3px_rgba(0,0,0,0.5)]"
            >
              <span className="w-8 h-8 rounded-2xl bg-white flex items-center justify-center shrink-0 text-forest group-hover:bg-white/90 transition-colors">
                <ArrowRightIcon size={14} />
              </span>
              <span className="text-body2 font-dm-sans">{t(ui.nav.login, locale)}</span>
            </Link>
          )}
        </div>

      </div>

        {/* Scheidingslijn */}
        <div className="h-px bg-white opacity-50 max-w-[1360px] mx-auto w-full" />
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Donkere overlay — klik om te sluiten */}
          <div className="absolute inset-0 bg-black/70" onClick={() => setMenuOpen(false)} />

          {/* Sienna kaart */}
          <div className="absolute top-[68px] left-0 right-2 bg-sienna rounded-2xl flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 h-[69px] shrink-0">
              <Link href={isEnglish ? '/en' : '/'} onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
                <LogoIcon className="text-white" />
                <span className="text-[20px] font-dm-sans font-medium tracking-[-0.6px] text-white uppercase leading-none">
                  Burcht ter Cleeff
                </span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label={t(ui.nav.closeMenu, locale)}
                className="flex items-center justify-center w-8 h-8"
              >
                <XIcon size={24} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col px-9 pt-6 pb-2 gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-h3 font-dm-sans text-white transition-opacity ${isActive ? 'opacity-100' : 'opacity-50'}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Acties */}
            <div className="flex flex-col px-9 pt-8 pb-10 gap-4">
              {user ? (
                <>
                  <Link
                    href="/mijn-omgeving"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-white text-body2 font-dm-sans"
                  >
                    <span className="w-8 h-8 rounded-2xl bg-forest flex items-center justify-center shrink-0 text-white">
                      <UserIcon size={16} />
                    </span>
                    {displayName}
                  </Link>
                  <button
                    onClick={() => { setMenuOpen(false); handleSignOut() }}
                    className="flex items-center gap-3 text-white/60 text-body2 font-dm-sans"
                  >
                    {t(ui.nav.logout, locale)}
                  </button>
                </>
              ) : (
                <Link
                  href={`${prefix}/inloggen`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-white text-body2 font-dm-sans"
                >
                  <span className="w-8 h-8 rounded-2xl bg-caramel flex items-center justify-center shrink-0 text-white">
                    <ArrowRightIcon size={16} />
                  </span>
                  {t(ui.nav.login, locale)}
                </Link>
              )}
              <Link
                href={`${prefix}/dagticket`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-white text-body2 font-dm-sans"
              >
                <span className="w-8 h-8 rounded-2xl bg-caramel flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t(ui.nav.buyTicket, locale)}
              </Link>

              {/* Taalschakelaar */}
              <div className="pt-2 border-t border-white/20">
                <LangSwitcher className="w-fit" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
