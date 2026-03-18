import type { Metadata } from 'next'
import DagticketForm from '@/components/sections/DagticketForm'

export const metadata: Metadata = {
  title: 'Dagkaartje kopen — Burcht ter Cleeff',
  description:
    'Koop een dagkaartje voor Burcht ter Cleeff. Selecteer het aantal bezoekers en betaal eenvoudig online.',
  robots: { index: false, follow: false },
}

export default function DagticketPage() {
  return (
    <>
      <section className="bg-forest w-full pt-[69px]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <p className="text-white/60 text-body2 font-dm-sans mb-1">Burcht ter Cleeff</p>
          <h1 className="text-[42px] leading-[46px] tracking-[-0.03em] md:text-h1 font-dm-sans text-white">
            Dagkaartje kopen
          </h1>
        </div>
      </section>
      <div className="bg-white min-h-screen">
        <DagticketForm />
      </div>
    </>
  )
}
