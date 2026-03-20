'use client'

import QRCode from 'react-qr-code'
import { useState, useEffect } from 'react'

const COUNTDOWN_SECONDS = 15

interface QrDisplayProps {
  scanUrl: string
  persons: number
}

export default function QrDisplay({ scanUrl, persons }: QrDisplayProps) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (revealed) return
    if (secondsLeft <= 0) {
      setRevealed(true)
      return
    }
    const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft, revealed])

  if (!revealed) {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="bg-white rounded-2xl border border-grey p-8 flex flex-col items-center gap-5 w-full">
          {/* Spinner */}
          <span className="w-10 h-10 rounded-full border-4 border-forest/20 border-t-forest animate-spin" />

          <div className="text-center">
            <p className="text-body2 font-dm-sans text-black mb-1">
              Betaling verwerken…
            </p>
            <p className="text-body3 font-dm-sans text-black/50">
              QR-code verschijnt over {secondsLeft} seconde{secondsLeft !== 1 ? 'n' : ''}
            </p>
          </div>

          <button
            onClick={() => setRevealed(true)}
            className="text-body3 font-dm-sans text-forest underline underline-offset-2 hover:text-forest/70 transition-colors"
          >
            Al betaald? Toon QR-code nu
          </button>
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
