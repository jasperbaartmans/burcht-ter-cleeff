import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export { viewport } from 'next-sanity/studio'

export const metadata = {
  title: 'Sanity Studio — Burcht ter Cleeff',
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
