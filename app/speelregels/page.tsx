import SpeelregelsHero from '@/components/sections/SpeelregelsHero'
import SpeelregelsGrid from '@/components/sections/SpeelregelsGrid'
import SpeelregelsFeedbackCTA from '@/components/sections/SpeelregelsFeedbackCTA'

export const metadata = {
  title: 'Speelregels — Burcht ter Cleeff',
  description:
    'Bekijk de speelregels van Speeltuin Burcht ter Cleeff voor een veilig en prettig verblijf voor iedereen.',
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
