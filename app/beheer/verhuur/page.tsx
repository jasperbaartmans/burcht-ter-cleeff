import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/auth/isAdmin'
import Button from '@/components/ui/Button'
import BeheerVerhuurClient from './BeheerVerhuurClient'

export const metadata = {
  title: 'Verhuur beheer — Burcht ter Cleeff',
  robots: { index: false, follow: false },
}

export default async function BeheerVerhuurPage() {
  const user = await getAdminUser()
  if (!user) redirect('/beheer')

  const adminSupabase = createAdminClient()

  const [{ data: reservations }, { data: { users } }] = await Promise.all([
    adminSupabase
      .from('reservations')
      .select('id, date, status, notes, admin_notes, user_id, created_at')
      .order('date', { ascending: false }),
    adminSupabase.auth.admin.listUsers({ perPage: 1000 }),
  ])

  const userMap: Record<string, string> = {}
  for (const u of users) {
    if (u.id && u.email) userMap[u.id] = u.email
  }

  const data = (reservations ?? []).map((r) => ({
    ...r,
    user_email: userMap[r.user_id] ?? 'Onbekend',
  }))

  return (
    <>
      <section className="bg-sienna w-full pt-[69px]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <p className="text-white/60 text-body2 font-dm-sans mb-1">Beheer</p>
          <h1 className="text-[42px] leading-[46px] tracking-[-0.03em] md:text-h1 font-dm-sans text-white">
            Verhuur
          </h1>
        </div>
      </section>

      <div className="bg-white min-h-screen">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-16 md:py-24">

          {/* Navigatie beheer */}
          <div className="flex gap-4 mb-10 flex-wrap">
            <Button as="link" href="/beheer/dagtickets" variant="ghost-sienna" size="sm">
              Dagtickets
            </Button>
            <Button as="link" href="/beheer/verhuur" variant="sienna" size="sm">
              Verhuur
            </Button>
            <Button as="link" href="/beheer/leden" variant="ghost-sienna" size="sm">
              Leden
            </Button>
          </div>

          <BeheerVerhuurClient reservations={data} />

        </div>
      </div>
    </>
  )
}
