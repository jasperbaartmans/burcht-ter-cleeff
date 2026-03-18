import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// Lees token uit .env.local
const envContent = readFileSync(resolve(ROOT, '.env.local'), 'utf-8')
const tokenMatch = envContent.match(/SANITY_WRITE_TOKEN=(.+)/)
const token = process.env.SANITY_TOKEN || (tokenMatch ? tokenMatch[1].trim() : null)

if (!token) {
  console.error('Geen SANITY_WRITE_TOKEN gevonden in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: 'xdehskge',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function uploadImage(filename, description) {
  const path = resolve(ROOT, 'public/images', filename)
  console.log(`Uploading ${filename}...`)
  const asset = await client.assets.upload('image', createReadStream(path), {
    filename,
    contentType: 'image/jpeg',
  })
  console.log(`  ✓ ${description} → ${asset._id}`)
  return asset
}

async function seed() {
  console.log('Uploading images...\n')

  const [hero, family, location, facilities, schommel, verhuur] = await Promise.all([
    uploadImage('hero.jpg', 'Hero afbeelding'),
    uploadImage('feature-family.jpg', 'Familievriendelijk'),
    uploadImage('feature-location.jpg', 'Unieke locatie'),
    uploadImage('feature-facilities.jpg', 'Veel voorzieningen'),
    uploadImage('schommel.jpg', 'Volledige foto'),
    uploadImage('verhuur.jpg', 'Verhuur CTA'),
  ])

  console.log('\nCreating homePage document...')

  const doc = {
    _id: 'homePage',
    _type: 'homePage',

    hero: {
      h1: 'De speeltuin voor ouderwets plezier en avontuur.',
      statusLabel: 'Open tot 18:00u',
    },

    featureCards: {
      h2: 'Avontuur en ontspanning in Speeltuin Burcht ter Cleeff',
      cards: [
        {
          _key: 'card-family',
          label: 'Familievriendelijk',
          body: 'Speeltuin Burcht ter Cleeff is ingericht voor alle leeftijden. Van peuters tot grootouders — iedereen vindt hier zijn plek.',
          alt: 'Families genieten samen van de speeltuin',
          image: { _type: 'image', asset: { _type: 'reference', _ref: family._id } },
        },
        {
          _key: 'card-location',
          label: 'Unieke locatie',
          body: 'Geniet van het spelen in en rondom een middeleeuws kasteelterrein, omringd door natuur en geschiedenis.',
          alt: 'Het historische kasteelterrein van Burcht ter Cleeff',
          image: { _type: 'image', asset: { _type: 'reference', _ref: location._id } },
        },
        {
          _key: 'card-facilities',
          label: 'Veel voorzieningen',
          body: 'Volop speeltoestellen, picknickplaatsen, sanitair en een kiosk voor versnaperingen. Een dagje uit is hier compleet.',
          alt: 'Speeltoestellen en voorzieningen in de speeltuin',
          image: { _type: 'image', asset: { _type: 'reference', _ref: facilities._id } },
        },
      ],
    },

    quote: {
      h2: 'Kinderen spelen en leren in een historische omgeving met diverse speeltoestellen, terwijl ouders ontspannen in het groen.',
      body1: 'Bij Burcht ter Cleeff geloven we dat spelen meer is dan vermaak. Het is de manier waarop kinderen de wereld ontdekken, vriendschappen sluiten en zichzelf uitdagen.',
      body2: 'Onze speeltuin biedt een unieke combinatie van historische omgeving en creatieve speelruimte. Laat uw kind rennen, klimmen, dromen — terwijl u geniet van de rust van ons prachtige kasteelterrein.',
    },

    fullPhoto: {
      alt: 'Kind op de schommel in Speeltuin Burcht ter Cleeff',
      image: { _type: 'image', asset: { _type: 'reference', _ref: schommel._id } },
    },

    verhuurCTA: {
      label: 'Voor groepen & bedrijven',
      h3: 'Verhuurmogelijkheden',
      body: 'Organiseer uw bedrijfsuitje, verjaardag of schoolreisje op het unieke terrein van Burcht ter Cleeff. Wij zorgen voor een onvergetelijke dag.',
      bullets: [
        'Exclusieve huur van het terrein',
        'Capaciteit tot 500 personen',
        'Catering & decoratie mogelijk',
      ],
      image: { _type: 'image', asset: { _type: 'reference', _ref: verhuur._id } },
    },
  }

  await client.createOrReplace(doc)
  console.log('✓ homePage document aangemaakt en gepubliceerd!\n')
  console.log('Klaar. Ga naar http://localhost:3000/studio om de content te bekijken.')
}

seed().catch((err) => {
  console.error('Fout:', err.message)
  process.exit(1)
})
