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
  console.log('✓ homePage\n')

  // ── speelregelsPage ──────────────────────────────────────────────────────
  console.log('Creating speelregelsPage document...')
  await client.createOrReplace({
    _id: 'speelregelsPage',
    _type: 'speelregelsPage',
    hero: {
      h1: 'Speelregels',
    },
    grid: {
      h2: 'Zodat iedereen veilig kan spelen',
      regels: [
        {
          _key: 'regel1',
          titel: 'Speel op eigen risico',
          tekst: 'Spelen is geweldig, maar soms val je. Ouders en verzorgers zijn verantwoordelijk voor hun kinderen.',
          variant: 'dark',
          icon: 'risk',
        },
        {
          _key: 'regel2',
          titel: 'Gooi niets op de grond',
          tekst: 'Gebruik de prullenbakken en neem je afval mee naar huis. Samen houden we de speeltuin schoon.',
          variant: 'light',
          icon: 'trash',
        },
        {
          _key: 'regel3',
          titel: 'Geen honden toegestaan',
          tekst: 'Om de veiligheid en hygiëne te waarborgen zijn honden niet welkom in de speeltuin.',
          variant: 'light',
          icon: 'noDog',
        },
        {
          _key: 'regel4',
          titel: 'Fietsen buiten de ingang',
          tekst: 'Stall je fiets netjes buiten bij het fietsenrek. Fietsen zijn niet toegestaan op het speelterrein.',
          variant: 'light',
          icon: 'bike',
        },
        {
          _key: 'regel5',
          titel: 'Niet roken',
          tekst: 'Roken is verboden op het gehele terrein. Dit geldt ook voor e-sigaretten.',
          variant: 'dark',
          icon: 'noSmoke',
        },
        {
          _key: 'regel6',
          titel: 'Eigen speelgoed welkom',
          tekst: 'Je mag je eigen speelgoed meenemen. Deel het met anderen en neem alles weer mee naar huis.',
          variant: 'light',
          icon: 'toy',
        },
      ],
    },
    feedbackCTA: {
      tekst: 'Heb je opmerkingen of suggesties over onze speelregels? We horen het graag van je!',
      email: 'info@burchttercleeff.nl',
    },
  })
  console.log('✓ speelregelsPage\n')

  // ── verhuurPage ──────────────────────────────────────────────────────────
  console.log('Creating verhuurPage document...')
  await client.createOrReplace({
    _id: 'verhuurPage',
    _type: 'verhuurPage',
    hero: {
      h1: 'Huur de speeltuin',
    },
    intro: {
      body1: 'Burcht ter Cleeff is te huur voor groepen, scholen, verenigingen en particulieren. De speeltuin biedt een unieke omgeving voor kinderfeestjes, schoolreisjes en andere activiteiten.',
      body2: 'Met ruimte voor groepen tot 150 personen en een prachtige ligging in de Schoterveense polder is dit de perfecte locatie voor jouw evenement. Neem contact op voor beschikbaarheid en tarieven.',
    },
    stappen: {
      h2: 'Zo werkt het',
      subtitle: 'In drie stappen een onvergetelijke dag geregeld',
      items: [
        {
          _key: 'stap1',
          titel: 'Neem contact op',
          omschrijving: 'Stuur ons een e-mail of bel ons op voor de beschikbaarheid van jouw gewenste datum.',
        },
        {
          _key: 'stap2',
          titel: 'Ontvang een offerte',
          omschrijving: 'We sturen je een vrijblijvende offerte op maat, afgestemd op jouw groep en wensen.',
        },
        {
          _key: 'stap3',
          titel: 'Geniet van de dag',
          omschrijving: 'Op de dag zelf staat alles klaar. Jij geniet, wij zorgen voor de rest.',
        },
      ],
    },
  })
  console.log('✓ verhuurPage\n')

  // ── contactPage ──────────────────────────────────────────────────────────
  console.log('Creating contactPage document...')
  await client.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    hero: {
      h1: 'Contact',
    },
    intro: {
      tekst: 'Heb je een vraag, opmerking of wil je de speeltuin huren? Stuur ons een bericht en we reageren zo snel mogelijk.',
    },
  })
  console.log('✓ contactPage\n')

  console.log('Klaar! Alle pagina\'s zijn gevuld.')
  console.log('Ga naar http://localhost:3000/studio om de content te bekijken en aan te passen.')
}

seed().catch((err) => {
  console.error('Fout:', err.message)
  process.exit(1)
})
