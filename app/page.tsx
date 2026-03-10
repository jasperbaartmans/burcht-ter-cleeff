import Hero from '@/components/sections/Hero'
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
