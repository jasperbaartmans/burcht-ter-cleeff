import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    languages: { 'nl': '/' },
  },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
