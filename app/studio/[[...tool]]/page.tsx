import type { Viewport } from 'next'
import StudioClientWrapper from './StudioClientWrapper'

export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata = {
  title: 'Sanity Studio — Burcht ter Cleeff',
}

export default function StudioPage() {
  return <StudioClientWrapper />
}
