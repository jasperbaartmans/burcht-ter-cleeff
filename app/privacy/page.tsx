import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import PrivacyContent from '@/components/sections/PrivacyContent'

export const metadata: Metadata = {
  title: 'Privacyverklaring — Burcht ter Cleeff',
  description:
    'Lees hoe Speeltuin Burcht ter Cleeff omgaat met jouw persoonsgegevens, welke rechten je hebt en hoe we jouw privacy beschermen.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        image="/images/feature-location.jpg"
        alt="Burcht ter Cleeff speeltuintetrein"
        defaultH1="Privacyverklaring"
      />
      <PrivacyContent />
    </>
  )
}
