import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { verhuurPageBilingualQuery, type BilingualVerhuurPageData, resolveVerhuurPage } from '@/lib/sanity/queries'
import PageHero from '@/components/sections/PageHero'
import VerhuurIntro from '@/components/sections/VerhuurIntro'
import VerhuurFullPhoto from '@/components/sections/VerhuurFullPhoto'
import VerhuurStappen from '@/components/sections/VerhuurStappen'
import SpeelregelsCTA from '@/components/sections/SpeelregelsCTA'

export const metadata: Metadata = {
  title: 'Rental — Burcht ter Cleeff',
  description: 'Rent the playground for an exclusive children\'s birthday party or private event. Discover the possibilities and book a date directly.',
  alternates: { canonical: '/en/verhuur', languages: { 'nl': '/verhuur' } },
}

export default async function EnRentalPage() {
  let raw: BilingualVerhuurPageData | null = null
  try {
    raw = await client.fetch(verhuurPageBilingualQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity unavailable — fallback texts will be used
  }

  const data = raw ? resolveVerhuurPage(raw, 'en') : null

  return (
    <>
      <PageHero image="/images/verhuur.jpg" alt="Rental of Playground Burcht ter Cleeff for birthdays and events" defaultH1="Rental" data={data?.hero} />
      <VerhuurIntro data={data?.intro} />
      <VerhuurFullPhoto />
      <VerhuurStappen data={data?.stappen} />
      <SpeelregelsCTA />
    </>
  )
}
