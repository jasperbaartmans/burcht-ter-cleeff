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
    label?: string
    h3?: string
    body?: string
    bullets?: string[]
    image?: SanityImage
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
      label,
      h3,
      body,
      bullets,
      image,
    }
  }
`
