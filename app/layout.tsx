import type { Metadata } from 'next'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { nlNL } from '@clerk/localizations'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
      <body className={`font-dm-sans antialiased bg-ivory text-black`}>
        <ClerkProvider localization={nlNL}>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
}
