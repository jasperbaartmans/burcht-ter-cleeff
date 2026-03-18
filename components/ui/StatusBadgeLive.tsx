'use client'

import { useEffect, useState } from 'react'
import StatusBadge from './StatusBadge'

function getStatus(): { status: 'open' | 'gesloten'; label: string } {
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const totalMinutes = h * 60 + m

  const openFrom = 9 * 60   // 09:00
  const openUntil = 18 * 60 // 18:00

  if (totalMinutes >= openFrom && totalMinutes < openUntil) {
    return { status: 'open', label: 'Open tot 18:00u' }
  }

  if (totalMinutes < openFrom) {
    return { status: 'gesloten', label: 'Gesloten · open om 09:00u' }
  }

  return { status: 'gesloten', label: 'Gesloten · open morgen 09:00u' }
}

export default function StatusBadgeLive({ className }: { className?: string }) {
  const [badge, setBadge] = useState<{ status: 'open' | 'gesloten'; label: string } | null>(null)

  useEffect(() => {
    setBadge(getStatus())

    // Herbereken elke minuut
    const interval = setInterval(() => setBadge(getStatus()), 60_000)
    return () => clearInterval(interval)
  }, [])

  if (!badge) return null

  return <StatusBadge status={badge.status} label={badge.label} variant="outline" className={className} />
}
