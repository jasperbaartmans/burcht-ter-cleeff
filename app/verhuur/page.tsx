import { client } from '@/lib/sanity/client'
import { verhuurPageQuery, type VerhuurPageData } from '@/lib/sanity/queries'
import VerhuurHero from '@/components/sections/VerhuurHero'
import VerhuurIntro from '@/components/sections/VerhuurIntro'
import VerhuurFullPhoto from '@/components/sections/VerhuurFullPhoto'
import VerhuurStappen from '@/components/sections/VerhuurStappen'
import SpeelregelsCTA from '@/components/sections/SpeelregelsCTA'

export const metadata = {
  title: 'Verhuur — Burcht ter Cleeff',
  description:
    'Huur de speeltuin voor een exclusief kinderfeestje of besloten evenement. Ontdek de mogelijkheden en boek direct een datum.',
}

export default async function VerhuurPage() {
  let data: VerhuurPageData | null = null
  try {
    data = await client.fetch(verhuurPageQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity niet beschikbaar — statische fallback wordt gebruikt
  }

  return (
    <>
      <VerhuurHero data={data?.hero} />
      <VerhuurIntro data={data?.intro} />
      <VerhuurFullPhoto />
      <VerhuurStappen data={data?.stappen} />
      <SpeelregelsCTA />
    </>
  )
}
