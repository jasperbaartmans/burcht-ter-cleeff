import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { contactPageBilingualQuery, type BilingualContactPageData, resolveContactPage } from '@/lib/sanity/queries'
import PageHero from '@/components/sections/PageHero'
import ContactIntro from '@/components/sections/ContactIntro'
import ContactContent from '@/components/sections/ContactContent'

export const metadata: Metadata = {
  title: 'Contact — Burcht ter Cleeff',
  description: 'Get in touch with Playground Burcht ter Cleeff. We answer questions about rental, opening hours and facilities.',
  alternates: { canonical: '/en/contact', languages: { 'nl': '/contact' } },
}

export default async function EnContactPage() {
  let raw: BilingualContactPageData | null = null
  try {
    raw = await client.fetch(contactPageBilingualQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity unavailable — fallback texts will be used
  }

  const data = raw ? resolveContactPage(raw, 'en') : null

  return (
    <>
      <PageHero image="/images/feature-family.jpg" alt="Contact with Playground Burcht ter Cleeff" defaultH1="Contact" data={data?.hero} />
      <ContactIntro data={data?.intro} />
      <ContactContent />
    </>
  )
}
