'use client'

import QRCode from 'react-qr-code'
import { useState, useEffect } from 'react'

interface QrDisplayProps {
  scanUrl: string
  persons: number
}

export default function QrDisplay({ scanUrl, persons }: QrDisplayProps) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 20000)
    return () => clearTimeout(timer)
  }, [])

  if (!revealed) {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="bg-white rounded-2xl border border-grey p-8 flex flex-col items-center gap-5 w-full">
          <span className="w-10 h-10 rounded-full border-4 border-forest/20 border-t-forest animate-spin" />
          <p className="text-body2 font-dm-sans text-black">
            Betaling verwerken…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-white rounded-2xl border border-grey p-6 flex flex-col items-center gap-4">
        <QRCode
          value={scanUrl}
          size={200}
          fgColor="#2d4a1e"
          bgColor="#ffffff"
          level="M"
        />
        <p className="text-body3 font-dm-sans text-black/50 text-center">
          {persons} {persons === 1 ? 'persoon' : 'personen'} · Geldig vandaag
        </p>
      </div>
      <p className="text-body3 font-dm-sans text-black/50 text-center">
        Laat de QR-code scannen door de beheerder bij de ingang.
      </p>
    </div>
  )
}
