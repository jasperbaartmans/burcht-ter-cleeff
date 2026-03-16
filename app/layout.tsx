import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { nlNL } from '@clerk/localizations'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const gtWalsheim = localFont({
  src: [
    {
      path: '../public/fonts/GTWalsheimPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/GTWalsheimPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-walsheim',
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
    <ClerkProvider localization={nlNL}>
      <html lang="nl">
        <body className={`${gtWalsheim.variable} font-walsheim antialiased bg-ivory text-black`}>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
