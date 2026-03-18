import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Betaling ontvangen — Burcht ter Cleeff',
  description: 'Bedankt voor je betaling. Tot ziens bij Burcht ter Cleeff!',
  robots: { index: false, follow: false },
}

export default function BedanktPage() {
  return (
    <>
      <section className="bg-forest w-full pt-[69px]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <p className="text-white/60 text-body2 font-dm-sans mb-1">Burcht ter Cleeff</p>
          <h1 className="text-[42px] leading-[46px] tracking-[-0.03em] md:text-h1 font-dm-sans text-white">
            Bedankt!
          </h1>
        </div>
      </section>
      <div className="bg-white min-h-screen flex items-start">
        <div className="max-w-[560px] mx-auto px-6 py-16 md:py-24 text-center">
          <p className="text-h3 font-dm-sans text-forest mb-4">Je dagkaartjes zijn betaald.</p>
          <p className="text-body2 font-dm-sans text-black/60 mb-10">
            We hebben je betaling ontvangen. Laat dit scherm zien bij de ingang van Burcht ter Cleeff. Tot ziens!
          </p>
          <Link href="/">
            <Button variant="primary" size="lg">Terug naar home</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
