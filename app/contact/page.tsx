import ContactHero from '@/components/sections/ContactHero'
import ContactIntro from '@/components/sections/ContactIntro'
import ContactContent from '@/components/sections/ContactContent'

export const metadata = {
  title: 'Contact — Burcht ter Cleeff',
  description:
    'Neem contact op met Speeltuin Burcht ter Cleeff. Wij beantwoorden vragen over verhuur, openingstijden en voorzieningen.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactIntro />
      <ContactContent />
    </>
  )
}
