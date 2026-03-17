'use client'

import { useUser } from '@clerk/nextjs'

export default function AccountHero() {
  const { user } = useUser()
  const naam = user ? [user.firstName, user.lastName].filter(Boolean).join(' ') : 'Mijn account'

  return (
    <section className="bg-forest w-full pt-[69px]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <p className="text-white/60 text-body2 font-dm-sans mb-1">Welkom terug</p>
        <h1 className="text-[42px] leading-[46px] tracking-[-0.03em] md:text-h1 font-dm-sans text-white">
          {naam}
        </h1>
      </div>
    </section>
  )
}
