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

export default function VerhuurPage() {
  return (
    <>
      <VerhuurHero />
      <VerhuurIntro />
      <VerhuurFullPhoto />
      <VerhuurStappen />
      <SpeelregelsCTA />
    </>
  )
}
