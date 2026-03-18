import { createClient } from '@sanity/client'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

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

console.log('✓ speelregelsPage bijgewerkt met 10 regels')
