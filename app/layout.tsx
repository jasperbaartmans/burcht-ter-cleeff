import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { nlNL } from '@clerk/localizations'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Burcht ter Cleeff — Speeltuin',
  description:
    'De speeltuin voor ouderwets plezier en avontuur. Ontdek Burcht ter Cleeff in Heemskerk.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <body className={`${dmSans.variable} font-dm-sans antialiased bg-ivory text-black`}>
        <ClerkProvider localization={nlNL}>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
}
