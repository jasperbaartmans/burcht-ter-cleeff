import type { Metadata } from 'next'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import './globals.css'
import { UserProvider } from '@/components/providers/UserProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://burchttercleeff.nl'),
  title: {
    default: 'Speeltuin Burcht ter Cleeff — Haarlem',
    template: '%s — Burcht ter Cleeff',
  },
  description:
    'Speeltuin Burcht ter Cleeff in Haarlem-Noord. Dagelijks open van 09:00 tot 18:00. Entree €0,60 per persoon. Buitenspeelplezier voor het hele gezin.',
  openGraph: {
    siteName: 'Burcht ter Cleeff',
    locale: 'nl_NL',
    type: 'website',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 800, alt: 'Speeltuin Burcht ter Cleeff' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'AmusementPark',
  name: 'Speeltuinvereniging Burcht ter Cleeff',
  url: 'https://burchttercleeff.nl',
  image: 'https://burchttercleeff.nl/images/hero.jpg',
  description:
    'Speeltuin Burcht ter Cleeff in Haarlem-Noord. Dagelijks open van 09:00 tot 18:00. Entree €0,60 per persoon.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Van Dortstraat 3',
    postalCode: '2023 JN',
    addressLocality: 'Haarlem',
    addressCountry: 'NL',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '€0,60 per persoon',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className={`font-dm-sans antialiased bg-ivory text-black`}>
        <UserProvider>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}
