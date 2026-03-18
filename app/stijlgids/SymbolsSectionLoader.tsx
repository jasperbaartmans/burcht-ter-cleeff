'use client'

import dynamic from 'next/dynamic'

const SymbolsSection = dynamic(() => import('./SymbolsSection'), { ssr: false })

export default function SymbolsSectionLoader() {
  return <SymbolsSection />
}
