import { groq } from 'next-sanity'

// ── Types ────────────────────────────────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number }
}

export interface HomePageData {
  hero?: {
    h1?: string
    statusLabel?: string
  }
  featureCards?: {
    h2?: string
    cards?: Array<{
      label?: string
      body?: string
      image?: SanityImage
      alt?: string
    }>
  }
  quote?: {
    h2?: string
    body1?: string
    body2?: string
  }
  fullPhoto?: {
    image?: SanityImage
    alt?: string
  }
  verhuurCTA?: {
    h3?: string
    body?: string
    body2?: string
    image?: SanityImage
  }
}

export interface SpeelregelsPageData {
  hero?: {
    h1?: string
  }
  grid?: {
    h2?: string
    regels?: Array<{
      titel?: string
      tekst?: string
      variant?: 'light' | 'dark'
      icon?: string
    }>
  }
  feedbackCTA?: {
    tekst?: string
    email?: string
  }
}

export interface VerhuurPageData {
  hero?: {
    h1?: string
  }
  intro?: {
    body1?: string
    body2?: string
  }
  stappen?: {
    h2?: string
    subtitle?: string
    items?: Array<{
      titel?: string
      omschrijving?: string
    }>
  }
}

export interface ContactPageData {
  hero?: {
    h1?: string
  }
  intro?: {
    tekst?: string
  }
}

// ── Queries ──────────────────────────────────────────────────────────────────

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    hero,
    featureCards {
      h2,
      cards[] {
        label,
        body,
        image,
        alt,
      }
    },
    quote,
    fullPhoto,
    verhuurCTA {
      h3,
      body,
      body2,
      image,
    }
  }
`

export const speelregelsPageQuery = groq`
  *[_type == "speelregelsPage"][0] {
    hero,
    grid {
      h2,
      regels[] { titel, tekst, variant, icon }
    },
    feedbackCTA,
  }
`

export const verhuurPageQuery = groq`
  *[_type == "verhuurPage"][0] {
    hero,
    intro,
    stappen {
      h2,
      subtitle,
      items[] { titel, omschrijving }
    },
  }
`

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    hero,
    intro,
  }
`
