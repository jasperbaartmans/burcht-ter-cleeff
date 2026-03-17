import type { Metadata } from 'next'
import DagticketForm from '@/components/sections/DagticketForm'

export const metadata: Metadata = {
  title: 'Dagkaartje kopen — Burcht ter Cleeff',
  description:
    'Koop een dagkaartje voor Burcht ter Cleeff. Selecteer het aantal bezoekers en betaal eenvoudig online.',
}

export default function DagticketPage() {
  return (
    <div className="bg-white min-h-screen pt-[69px]">
      <DagticketForm />
    </div>
  )
}
