'use client'

import { useEffect, useState } from 'react'
import StatusBadge from './StatusBadge'

type BadgeState = {
  status: 'open' | 'gesloten' | 'verhuurd'
  label: string
}

function getStatus(isRentalDay: boolean): BadgeState {
  const now = new Date()
  const totalMinutes = now.getHours() * 60 + now.getMinutes()

  const rentalStart = 9 * 60   // 09:00
  const rentalEnd   = 13 * 60  // 13:00
  const openUntil   = 18 * 60  // 18:00

  if (isRentalDay && totalMinutes >= rentalStart && totalMinutes < rentalEnd) {
    return { status: 'verhuurd', label: 'Verhuurd · 09:00–13:00u' }
  }

  if (totalMinutes >= rentalStart && totalMinutes < openUntil) {
    return { status: 'open', label: 'Open tot 18:00u' }
  }

  if (totalMinutes < rentalStart) {
    if (isRentalDay) {
      return { status: 'gesloten', label: 'Gesloten · verhuurd 09:00–13:00u' }
    }
    return { status: 'gesloten', label: 'Gesloten · open om 09:00u' }
  }

  return { status: 'gesloten', label: 'Gesloten · open morgen 09:00u' }
}

export default function StatusBadgeLive({ className }: { className?: string }) {
  const [badge, setBadge] = useState<BadgeState | null>(null)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    fetch('/api/status')
      .then((r) => r.json())
      .then(({ isRentalDay }: { isRentalDay: boolean }) => {
        setBadge(getStatus(isRentalDay))
        interval = setInterval(() => setBadge(getStatus(isRentalDay)), 60_000)
      })
      .catch(() => {
        // Fallback op tijdgebaseerde status bij netwerk fout
        setBadge(getStatus(false))
        interval = setInterval(() => setBadge(getStatus(false)), 60_000)
      })

    return () => clearInterval(interval)
  }, [])

  if (!badge) return null

  return <StatusBadge status={badge.status} label={badge.label} variant="outline" className={className} />
}
