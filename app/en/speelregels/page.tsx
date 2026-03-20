import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { speelregelsPageBilingualQuery, type BilingualSpeelregelsPageData, resolveSpeelregelsPage } from '@/lib/sanity/queries'
import PageHero from '@/components/sections/PageHero'
import SpeelregelsGrid from '@/components/sections/SpeelregelsGrid'
import SpeelregelsFeedbackCTA from '@/components/sections/SpeelregelsFeedbackCTA'

export const metadata: Metadata = {
  title: 'Rules — Burcht ter Cleeff',
  description: 'View the rules of Playground Burcht ter Cleeff in Haarlem. Entry €0.60 per person. Open daily from 09:00 to 18:00.',
  alternates: { canonical: '/en/speelregels', languages: { 'nl': '/speelregels' } },
}

export default async function EnRulesPage() {
  let raw: BilingualSpeelregelsPageData | null = null
  try {
    raw = await client.fetch(speelregelsPageBilingualQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity unavailable — fallback texts will be used
  }

  const data = raw ? resolveSpeelregelsPage(raw, 'en') : null

  return (
    <>
      <PageHero image="/images/feature-family.jpg" alt="Children playing at Playground Burcht ter Cleeff" defaultH1="Rules" data={data?.hero} />
      <SpeelregelsGrid data={data?.grid} />
      <SpeelregelsFeedbackCTA data={data?.feedbackCTA} />
    </>
  )
}
