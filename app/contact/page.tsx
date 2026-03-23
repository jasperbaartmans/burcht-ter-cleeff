import { client } from '@/lib/sanity/client'
import { contactPageQuery, type ContactPageData } from '@/lib/sanity/queries'
import PageHero from '@/components/sections/PageHero'
import ContactIntro from '@/components/sections/ContactIntro'
import ContactContent from '@/components/sections/ContactContent'

export const metadata = {
  title: 'Contact — Burcht ter Cleeff',
  description:
    'Neem contact op met Speeltuin Burcht ter Cleeff. Wij beantwoorden vragen over verhuur, openingstijden en voorzieningen.',
}

export default async function ContactPage() {
  let data: ContactPageData | null = null
  try {
    data = await client.fetch(contactPageQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity niet beschikbaar — statische fallback wordt gebruikt
  }

  return (
    <>
      <PageHero image="/images/feature-family.jpg" alt="Contact met Speeltuin Burcht ter Cleeff" defaultH1="Contact" data={data?.hero} />
      <ContactIntro data={data?.intro} />
      <ContactContent />
    </>
  )
}
