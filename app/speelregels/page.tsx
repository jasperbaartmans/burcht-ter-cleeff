import { client } from '@/lib/sanity/client'
import { speelregelsPageQuery, type SpeelregelsPageData } from '@/lib/sanity/queries'
import SpeelregelsHero from '@/components/sections/SpeelregelsHero'
import SpeelregelsGrid from '@/components/sections/SpeelregelsGrid'
import SpeelregelsFeedbackCTA from '@/components/sections/SpeelregelsFeedbackCTA'

export const metadata = {
  title: 'Speelregels — Burcht ter Cleeff',
  description:
    'Bekijk de speelregels van Speeltuin Burcht ter Cleeff in Haarlem. Entree €0,60 per persoon. Dagelijks open van 09:00 tot 18:00.',
}

export default async function SpeelregelsPage() {
  let data: SpeelregelsPageData | null = null
  try {
    data = await client.fetch(speelregelsPageQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity niet beschikbaar — statische fallback wordt gebruikt
  }

  return (
    <>
      <SpeelregelsHero data={data?.hero} />
      <SpeelregelsGrid data={data?.grid} />
      <SpeelregelsFeedbackCTA data={data?.feedbackCTA} />
    </>
  )
}
