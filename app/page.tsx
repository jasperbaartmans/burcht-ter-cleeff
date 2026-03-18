import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'

export const metadata: Metadata = {
  title: 'Speeltuin Burcht ter Cleeff — Haarlem',
  description:
    'Ontdek Speeltuin Burcht ter Cleeff in Haarlem-Noord. Dagelijks open van 09:00 tot 18:00, entree €0,60 per persoon. Buitenspeelplezier voor kinderen in de Schoterveense polder.',
  openGraph: {
    title: 'Speeltuin Burcht ter Cleeff — Haarlem',
    description:
      'Ontdek Speeltuin Burcht ter Cleeff in Haarlem-Noord. Dagelijks open van 09:00 tot 18:00, entree €0,60 per persoon.',
    url: 'https://burchttercleeff.nl',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 800, alt: 'Speeltuin Burcht ter Cleeff' }],
  },
}


import FeatureCards from '@/components/sections/FeatureCards'
import Quote from '@/components/sections/Quote'
import FullPhoto from '@/components/sections/FullPhoto'
import VerhuurCTA from '@/components/sections/VerhuurCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <Quote />
      <FullPhoto />
      <VerhuurCTA />
    </>
  )
}
