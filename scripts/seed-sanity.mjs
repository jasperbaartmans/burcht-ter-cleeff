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
      h2: 'Dit zijn onze speelregels',
      regels: [
        {
          _key: 'regel-toegang-leden',
          titel: 'Toegang voor leden',
          tekst: 'Leden van de speeltuinvereniging hebben onbeperkt toegang tijdens de reguliere openingstijden van de speeltuin.',
          variant: 'light',
          icon: 'person',
        },
        {
          _key: 'regel-toegangsprijs',
          titel: 'Toegangsprijs voor niet-leden',
          tekst: 'Niet-leden betalen een toegangsprijs van €0,60 per persoon per bezoek. Dit bedrag wordt betaald bij de beheerder.',
          variant: 'dark',
          icon: 'person',
        },
        {
          _key: 'regel-eigen-risico',
          titel: 'Spelen op eigen risico',
          tekst: 'Spelen voor zowel jong als oud gebeurt volledig op eigen risico. Houd hier rekening mee bij het betreden van de speeltuin.',
          variant: 'light',
          icon: 'risk',
        },
        {
          _key: 'regel-afval',
          titel: 'Afval opruimen',
          tekst: 'Alle bezoekers dienen hun afval direct in de daarvoor bestemde afvalbakken te deponeren. Zo houden we de speeltuin schoon.',
          variant: 'dark',
          icon: 'trash',
        },
        {
          _key: 'regel-speelgoed',
          titel: 'Speelgoed terugzetten',
          tekst: 'Speelgoed dat van de speeltuin gebruikt wordt, dient na gebruik netjes teruggezet te worden in het daarvoor bestemde schuurtje.',
          variant: 'dark',
          icon: 'toy',
        },
        {
          _key: 'regel-reglementen',
          titel: 'Algemene reglementen',
          tekst: 'Bij het betreden van de speeltuin aanvaard je automatisch het algemeen reglement, dat beschikbaar is bij de beheerder.',
          variant: 'dark',
          icon: 'doc',
        },
        {
          _key: 'regel-honden',
          titel: 'Honden zijn niet toegestaan',
          tekst: 'Honden mogen niet mee de speeltuin in, met uitzondering van geleidehonden die altijd welkom zijn.',
          variant: 'dark',
          icon: 'noDog',
        },
        {
          _key: 'regel-fietsen',
          titel: 'Fietsen parkeren',
          tekst: 'Fietsen dienen buiten de speeltuin geparkeerd te worden. Fietsen zijn niet toegestaan binnen de speeltuin.',
          variant: 'light',
          icon: 'bike',
        },
        {
          _key: 'regel-roken',
          titel: 'Verboden te roken en drinken',
          tekst: 'Roken en het gebruik van alcohol en 0.0% zijn strikt verboden binnen de speeltuin. Dit geldt voor alle bezoekers.',
          variant: 'dark',
          icon: 'noSmoke',
        },
        {
          _key: 'regel-kleding',
          titel: 'Kleding in de speeltuin',
          tekst: 'Kinderen dienen altijd, ook wanneer de fontein aanstaat, minimaal een onderbroekje of (zwem)luier te dragen.',
          variant: 'light',
          icon: 'shirt',
        },
      ],
    },
    feedbackCTA: {
      tekst: 'Ideeën, tips en suggesties zijn altijd welkom.\nJe kunt ze doorgeven bij het bestuur van de speeltuinvereniging.',
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
