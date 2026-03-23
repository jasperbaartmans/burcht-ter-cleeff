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

// ── Bilingual raw types (NL + EN fields) ────────────────────────────────────

export interface BilingualHomePageData {
  hero?: { h1?: string; statusLabel?: string; h1En?: string; statusLabelEn?: string }
  featureCards?: {
    h2?: string; h2En?: string
    cards?: Array<{ label?: string; body?: string; image?: SanityImage; alt?: string; labelEn?: string; bodyEn?: string; altEn?: string; _key?: string }>
  }
  quote?: { h2?: string; body1?: string; body2?: string; h2En?: string; body1En?: string; body2En?: string }
  fullPhoto?: { image?: SanityImage; alt?: string; altEn?: string }
  verhuurCTA?: { h3?: string; body?: string; body2?: string; image?: SanityImage; h3En?: string; bodyEn?: string; body2En?: string }
}

export interface BilingualSpeelregelsPageData {
  hero?: { h1?: string; h1En?: string }
  grid?: {
    h2?: string; h2En?: string
    regels?: Array<{ titel?: string; tekst?: string; titelEn?: string; tekstEn?: string; variant?: 'light' | 'dark'; icon?: string; _key?: string }>
  }
  feedbackCTA?: { tekst?: string; tekstEn?: string; email?: string }
}

export interface BilingualVerhuurPageData {
  hero?: { h1?: string; h1En?: string }
  intro?: { body1?: string; body2?: string; body1En?: string; body2En?: string }
  stappen?: {
    h2?: string; subtitle?: string; h2En?: string; subtitleEn?: string
    items?: Array<{ titel?: string; omschrijving?: string; titelEn?: string; omschrijvingEn?: string; _key?: string }>
  }
}

export interface BilingualContactPageData {
  hero?: { h1?: string; h1En?: string }
  intro?: { tekst?: string; tekstEn?: string }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function resolveHomePage(d: BilingualHomePageData, lang: 'nl' | 'en'): HomePageData {
  const e = lang === 'en'
  return {
    hero: { h1: (e && d.hero?.h1En) || d.hero?.h1, statusLabel: (e && d.hero?.statusLabelEn) || d.hero?.statusLabel },
    featureCards: {
      h2: (e && d.featureCards?.h2En) || d.featureCards?.h2,
      cards: d.featureCards?.cards?.map((c) => ({ ...c, label: (e && c.labelEn) || c.label, body: (e && c.bodyEn) || c.body, alt: (e && c.altEn) || c.alt })),
    },
    quote: { h2: (e && d.quote?.h2En) || d.quote?.h2, body1: (e && d.quote?.body1En) || d.quote?.body1, body2: (e && d.quote?.body2En) || d.quote?.body2 },
    fullPhoto: { image: d.fullPhoto?.image, alt: (e && d.fullPhoto?.altEn) || d.fullPhoto?.alt },
    verhuurCTA: { h3: (e && d.verhuurCTA?.h3En) || d.verhuurCTA?.h3, body: (e && d.verhuurCTA?.bodyEn) || d.verhuurCTA?.body, body2: (e && d.verhuurCTA?.body2En) || d.verhuurCTA?.body2, image: d.verhuurCTA?.image },
  }
}

export function resolveSpeelregelsPage(d: BilingualSpeelregelsPageData, lang: 'nl' | 'en'): SpeelregelsPageData {
  const e = lang === 'en'
  return {
    hero: { h1: (e && d.hero?.h1En) || d.hero?.h1 },
    grid: {
      h2: (e && d.grid?.h2En) || d.grid?.h2,
      regels: d.grid?.regels?.map((r) => ({ ...r, titel: (e && r.titelEn) || r.titel, tekst: (e && r.tekstEn) || r.tekst })),
    },
    feedbackCTA: { tekst: (e && d.feedbackCTA?.tekstEn) || d.feedbackCTA?.tekst, email: d.feedbackCTA?.email },
  }
}

export function resolveVerhuurPage(d: BilingualVerhuurPageData, lang: 'nl' | 'en'): VerhuurPageData {
  const e = lang === 'en'
  return {
    hero: { h1: (e && d.hero?.h1En) || d.hero?.h1 },
    intro: { body1: (e && d.intro?.body1En) || d.intro?.body1, body2: (e && d.intro?.body2En) || d.intro?.body2 },
    stappen: {
      h2: (e && d.stappen?.h2En) || d.stappen?.h2,
      subtitle: (e && d.stappen?.subtitleEn) || d.stappen?.subtitle,
      items: d.stappen?.items?.map((i) => ({ ...i, titel: (e && i.titelEn) || i.titel, omschrijving: (e && i.omschrijvingEn) || i.omschrijving })),
    },
  }
}

export function resolveContactPage(d: BilingualContactPageData, lang: 'nl' | 'en'): ContactPageData {
  const e = lang === 'en'
  return {
    hero: { h1: (e && d.hero?.h1En) || d.hero?.h1 },
    intro: { tekst: (e && d.intro?.tekstEn) || d.intro?.tekst },
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

// ── Bilingual queries (fetch NL + EN) ─────────────────────────────────────────

export const homePageBilingualQuery = groq`
  *[_type == "homePage"][0] {
    hero,
    featureCards {
      h2, h2En,
      cards[] { label, body, image, alt, labelEn, bodyEn, altEn }
    },
    quote { h2, body1, body2, h2En, body1En, body2En },
    fullPhoto { image, alt, altEn },
    verhuurCTA { h3, body, body2, image, h3En, bodyEn, body2En }
  }
`

export const speelregelsPageBilingualQuery = groq`
  *[_type == "speelregelsPage"][0] {
    hero { h1, h1En },
    grid {
      h2, h2En,
      regels[] { titel, tekst, titelEn, tekstEn, variant, icon }
    },
    feedbackCTA { tekst, tekstEn, email },
  }
`

export const verhuurPageBilingualQuery = groq`
  *[_type == "verhuurPage"][0] {
    hero { h1, h1En },
    intro { body1, body2, body1En, body2En },
    stappen {
      h2, subtitle, h2En, subtitleEn,
      items[] { titel, omschrijving, titelEn, omschrijvingEn }
    },
  }
`

export const contactPageBilingualQuery = groq`
  *[_type == "contactPage"][0] {
    hero { h1, h1En },
    intro { tekst, tekstEn },
  }
`
