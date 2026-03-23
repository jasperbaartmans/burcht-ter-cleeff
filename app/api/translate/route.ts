import { createClient } from '@sanity/client'
import Anthropic from '@anthropic-ai/sdk'

const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── Extractors per document type ─────────────────────────────────────────────

function extractHomePage(doc: Record<string, unknown>) {
  const hero = doc.hero as Record<string, string> | undefined
  const featureCards = doc.featureCards as Record<string, unknown> | undefined
  const quote = doc.quote as Record<string, string> | undefined
  const fullPhoto = doc.fullPhoto as Record<string, string> | undefined
  const verhuurCTA = doc.verhuurCTA as Record<string, string> | undefined
  const cards = featureCards?.cards as Array<Record<string, string>> | undefined

  return {
    'hero.h1': hero?.h1,
    'hero.statusLabel': hero?.statusLabel,
    'featureCards.h2': featureCards?.h2 as string | undefined,
    ...(cards?.reduce((acc, card, i) => ({
      ...acc,
      [`featureCards.cards.${i}.label`]: card.label,
      [`featureCards.cards.${i}.body`]: card.body,
      [`featureCards.cards.${i}.alt`]: card.alt,
    }), {})),
    'quote.h2': quote?.h2,
    'quote.body1': quote?.body1,
    'quote.body2': quote?.body2,
    'fullPhoto.alt': fullPhoto?.alt,
    'verhuurCTA.h3': verhuurCTA?.h3,
    'verhuurCTA.body': verhuurCTA?.body,
    'verhuurCTA.body2': verhuurCTA?.body2,
  }
}

function extractSpeelregelsPage(doc: Record<string, unknown>) {
  const hero = doc.hero as Record<string, string> | undefined
  const grid = doc.grid as Record<string, unknown> | undefined
  const feedbackCTA = doc.feedbackCTA as Record<string, string> | undefined
  const regels = grid?.regels as Array<Record<string, string>> | undefined

  return {
    'hero.h1': hero?.h1,
    'grid.h2': grid?.h2 as string | undefined,
    ...(regels?.reduce((acc, r, i) => ({
      ...acc,
      [`grid.regels.${i}.titel`]: r.titel,
      [`grid.regels.${i}.tekst`]: r.tekst,
    }), {})),
    'feedbackCTA.tekst': feedbackCTA?.tekst,
  }
}

function extractVerhuurPage(doc: Record<string, unknown>) {
  const hero = doc.hero as Record<string, string> | undefined
  const intro = doc.intro as Record<string, string> | undefined
  const stappen = doc.stappen as Record<string, unknown> | undefined
  const items = stappen?.items as Array<Record<string, string>> | undefined

  return {
    'hero.h1': hero?.h1,
    'intro.body1': intro?.body1,
    'intro.body2': intro?.body2,
    'stappen.h2': stappen?.h2 as string | undefined,
    'stappen.subtitle': stappen?.subtitle as string | undefined,
    ...(items?.reduce((acc, item, i) => ({
      ...acc,
      [`stappen.items.${i}.titel`]: item.titel,
      [`stappen.items.${i}.omschrijving`]: item.omschrijving,
    }), {})),
  }
}

function extractContactPage(doc: Record<string, unknown>) {
  const hero = doc.hero as Record<string, string> | undefined
  const intro = doc.intro as Record<string, string> | undefined

  return {
    'hero.h1': hero?.h1,
    'intro.tekst': intro?.tekst,
  }
}

// ── Build Sanity patch from flat translated keys ──────────────────────────────

// Maps flat key → Sanity patch path for homePage
function buildHomePagePatch(translated: Record<string, string>, doc: Record<string, unknown>) {
  const featureCards = doc.featureCards as Record<string, unknown> | undefined
  const cards = featureCards?.cards as Array<Record<string, unknown>> | undefined
  const patch: Record<string, string> = {}

  if (translated['hero.h1']) patch['hero.h1En'] = translated['hero.h1']
  if (translated['hero.statusLabel']) patch['hero.statusLabelEn'] = translated['hero.statusLabel']
  if (translated['featureCards.h2']) patch['featureCards.h2En'] = translated['featureCards.h2']
  if (translated['quote.h2']) patch['quote.h2En'] = translated['quote.h2']
  if (translated['quote.body1']) patch['quote.body1En'] = translated['quote.body1']
  if (translated['quote.body2']) patch['quote.body2En'] = translated['quote.body2']
  if (translated['fullPhoto.alt']) patch['fullPhoto.altEn'] = translated['fullPhoto.alt']
  if (translated['verhuurCTA.h3']) patch['verhuurCTA.h3En'] = translated['verhuurCTA.h3']
  if (translated['verhuurCTA.body']) patch['verhuurCTA.bodyEn'] = translated['verhuurCTA.body']
  if (translated['verhuurCTA.body2']) patch['verhuurCTA.body2En'] = translated['verhuurCTA.body2']

  cards?.forEach((_, i) => {
    if (translated[`featureCards.cards.${i}.label`]) patch[`featureCards.cards[${i}].labelEn`] = translated[`featureCards.cards.${i}.label`]
    if (translated[`featureCards.cards.${i}.body`]) patch[`featureCards.cards[${i}].bodyEn`] = translated[`featureCards.cards.${i}.body`]
    if (translated[`featureCards.cards.${i}.alt`]) patch[`featureCards.cards[${i}].altEn`] = translated[`featureCards.cards.${i}.alt`]
  })

  return patch
}

function buildSpeelregelsPatch(translated: Record<string, string>, doc: Record<string, unknown>) {
  const grid = doc.grid as Record<string, unknown> | undefined
  const regels = grid?.regels as Array<Record<string, unknown>> | undefined
  const patch: Record<string, string> = {}

  if (translated['hero.h1']) patch['hero.h1En'] = translated['hero.h1']
  if (translated['grid.h2']) patch['grid.h2En'] = translated['grid.h2']
  if (translated['feedbackCTA.tekst']) patch['feedbackCTA.tekstEn'] = translated['feedbackCTA.tekst']

  regels?.forEach((_, i) => {
    if (translated[`grid.regels.${i}.titel`]) patch[`grid.regels[${i}].titelEn`] = translated[`grid.regels.${i}.titel`]
    if (translated[`grid.regels.${i}.tekst`]) patch[`grid.regels[${i}].tekstEn`] = translated[`grid.regels.${i}.tekst`]
  })

  return patch
}

function buildVerhuurPatch(translated: Record<string, string>, doc: Record<string, unknown>) {
  const stappen = doc.stappen as Record<string, unknown> | undefined
  const items = stappen?.items as Array<Record<string, unknown>> | undefined
  const patch: Record<string, string> = {}

  if (translated['hero.h1']) patch['hero.h1En'] = translated['hero.h1']
  if (translated['intro.body1']) patch['intro.body1En'] = translated['intro.body1']
  if (translated['intro.body2']) patch['intro.body2En'] = translated['intro.body2']
  if (translated['stappen.h2']) patch['stappen.h2En'] = translated['stappen.h2']
  if (translated['stappen.subtitle']) patch['stappen.subtitleEn'] = translated['stappen.subtitle']

  items?.forEach((_, i) => {
    if (translated[`stappen.items.${i}.titel`]) patch[`stappen.items[${i}].titelEn`] = translated[`stappen.items.${i}.titel`]
    if (translated[`stappen.items.${i}.omschrijving`]) patch[`stappen.items[${i}].omschrijvingEn`] = translated[`stappen.items.${i}.omschrijving`]
  })

  return patch
}

function buildContactPatch(translated: Record<string, string>) {
  const patch: Record<string, string> = {}
  if (translated['hero.h1']) patch['hero.h1En'] = translated['hero.h1']
  if (translated['intro.tekst']) patch['intro.tekstEn'] = translated['intro.tekst']
  return patch
}

// ── Claude translation ────────────────────────────────────────────────────────

async function translateWithClaude(texts: Record<string, string | undefined>): Promise<Record<string, string>> {
  // Remove empty/undefined values
  const filtered = Object.fromEntries(
    Object.entries(texts).filter(([, v]) => v && v.trim())
  ) as Record<string, string>

  if (Object.keys(filtered).length === 0) return {}

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `Translate the following Dutch playground/children's park website content to English.
Return ONLY a valid JSON object with exactly the same keys, but with English translations as values.
Keep the same friendly, family-oriented tone.
Do NOT translate: brand names (Burcht ter Cleeff), email addresses, or street addresses.

Input JSON:
${JSON.stringify(filtered, null, 2)}`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected Claude response type')

  // Extract JSON from response (strip any markdown code fences)
  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found in Claude response')

  return JSON.parse(jsonMatch[0])
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    // Verify webhook secret
    const secret = request.headers.get('x-sanity-webhook-secret')
    if (process.env.SANITY_WEBHOOK_SECRET && secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const doc = body as Record<string, unknown>
    const docType = doc._type as string
    const docId = doc._id as string

    if (!docId || !docType) {
      return Response.json({ error: 'Missing _id or _type' }, { status: 400 })
    }

    let texts: Record<string, string | undefined>
    let buildPatch: (translated: Record<string, string>) => Record<string, string>

    switch (docType) {
      case 'homePage':
        texts = extractHomePage(doc)
        buildPatch = (t) => buildHomePagePatch(t, doc)
        break
      case 'speelregelsPage':
        texts = extractSpeelregelsPage(doc)
        buildPatch = (t) => buildSpeelregelsPatch(t, doc)
        break
      case 'verhuurPage':
        texts = extractVerhuurPage(doc)
        buildPatch = (t) => buildVerhuurPatch(t, doc)
        break
      case 'contactPage':
        texts = extractContactPage(doc)
        buildPatch = (t) => buildContactPatch(t)
        break
      default:
        return Response.json({ message: `Document type '${docType}' not supported` }, { status: 200 })
    }

    const translated = await translateWithClaude(texts)
    const patch = buildPatch(translated)

    if (Object.keys(patch).length > 0) {
      await sanityWriteClient.patch(docId).set(patch).commit()
    }

    return Response.json({ ok: true, fieldsTranslated: Object.keys(patch).length })
  } catch (err) {
    console.error('[translate webhook]', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
