import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account aanmaken',
  robots: { index: false, follow: false },
}

export default function RegistrerenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
