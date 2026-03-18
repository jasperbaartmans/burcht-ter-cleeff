import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AccountHero from '@/components/sections/AccountHero'
import AccountProfile from '@/components/sections/AccountProfile'
import AccountVerhuur from '@/components/sections/AccountVerhuur'
import AccountKaartjes from '@/components/sections/AccountKaartjes'
import AccountNotificaties from '@/components/sections/AccountNotificaties'

export const metadata = {
  title: 'Mijn account — Burcht ter Cleeff',
  description: 'Beheer je profiel, reserveringen, kaartjes en notificaties.',
  robots: { index: false, follow: false },
}

export default async function MijnOmgevingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/inloggen')

  return (
    <>
      <AccountHero />
      <main className="bg-white">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <AccountProfile />
          <AccountVerhuur />
          <AccountKaartjes />
          <AccountNotificaties />
        </div>
      </main>
    </>
  )
}
