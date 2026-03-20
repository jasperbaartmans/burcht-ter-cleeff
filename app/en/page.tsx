import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { homePageBilingualQuery, type BilingualHomePageData, resolveHomePage } from '@/lib/sanity/queries'
import Hero from '@/components/sections/Hero'
import FeatureCards from '@/components/sections/FeatureCards'
import Quote from '@/components/sections/Quote'
import FullPhoto from '@/components/sections/FullPhoto'
import VerhuurCTA from '@/components/sections/VerhuurCTA'

export const metadata: Metadata = {
  title: 'Playground Burcht ter Cleeff — Haarlem',
  description:
    'Discover Playground Burcht ter Cleeff in Haarlem-Noord. Open daily from 09:00 to 18:00, entry €0.60 per person. Outdoor fun for the whole family.',
  openGraph: {
    title: 'Playground Burcht ter Cleeff — Haarlem',
    description: 'Discover Playground Burcht ter Cleeff in Haarlem-Noord. Open daily from 09:00 to 18:00, entry €0.60 per person.',
    url: 'https://burchttercleeff.nl/en',
    locale: 'en_GB',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 800, alt: 'Playground Burcht ter Cleeff' }],
  },
  alternates: { canonical: '/en', languages: { 'nl': '/' } },
}

export default async function EnHomePage() {
  let raw: BilingualHomePageData | null = null
  try {
    raw = await client.fetch(homePageBilingualQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity unavailable — fallback texts will be used
  }

  const data = raw ? resolveHomePage(raw, 'en') : null

  return (
    <>
      <Hero data={data?.hero} />
      <FeatureCards data={data?.featureCards} />
      <Quote data={data?.quote} />
      <FullPhoto data={data?.fullPhoto} />
      <VerhuurCTA data={data?.verhuurCTA} />
    </>
  )
}
