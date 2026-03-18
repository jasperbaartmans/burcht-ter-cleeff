import SpeelregelsHero from '@/components/sections/SpeelregelsHero'
import SpeelregelsGrid from '@/components/sections/SpeelregelsGrid'
import SpeelregelsFeedbackCTA from '@/components/sections/SpeelregelsFeedbackCTA'

export const metadata = {
  title: 'Speelregels — Burcht ter Cleeff',
  description:
    'Bekijk de speelregels van Speeltuin Burcht ter Cleeff in Haarlem. Entree €0,60 per persoon. Dagelijks open van 09:00 tot 18:00.',
}

export default function SpeelregelsPage() {
  return (
    <>
      <SpeelregelsHero />
      <SpeelregelsGrid />
      <SpeelregelsFeedbackCTA />
    </>
  )
}
