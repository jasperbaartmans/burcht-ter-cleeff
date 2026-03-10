# Burcht ter Cleeff — Project Blauwdruk

## Stack

| Laag | Keuze | Reden |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, routing, API routes |
| Styling | Tailwind CSS | Design tokens, utility-first |
| Auth | Clerk | Mijn Omgeving, gebruikersbeheer |
| Database | Supabase | Verhuurkalender, tickethistorie, notificaties |
| Betaling | Tikkie Business (stichtingstarief) | Dagtickets, €0,15/transactie |
| Hosting | Vercel | Gratis, native Next.js |
| Fonts | GT Walsheim Pro + Helvetica Neue | Via locals in /public/fonts |

---

## Design Tokens

### Kleuren

```js
// tailwind.config.js
colors: {
  black:   '#262628',
  white:   '#FFFFFF',
  grey:    '#E0E1DA',
  ivory:   '#F3EEE2',
  forest:  '#789928', // primair groen
  moss:    '#8D9462',
  sienna:  '#853F21', // footer, kasteel
  caramel: '#B07826',
}
```

### Typografie (GT Walsheim Pro)

```js
// tailwind.config.js — fontSize
'h1': ['72px', { lineHeight: '70px', letterSpacing: '-0.03em', fontWeight: '400' }],
'h2': ['56px', { lineHeight: '60px', letterSpacing: '-0.03em', fontWeight: '400' }],
'h3': ['40px', { lineHeight: '44px', letterSpacing: '-0.02em', fontWeight: '500' }],
'h4': ['29px', { lineHeight: '30px', letterSpacing: '-0.01em', fontWeight: '500' }],
'sub1': ['20px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '500' }],
'sub2': ['18px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '500' }],
'sub3': ['16px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '500' }],
'body1': ['20px', { lineHeight: '26px', letterSpacing: '-0.03em', fontWeight: '400' }],
'body2': ['17px', { lineHeight: '23px', letterSpacing: '-0.03em', fontWeight: '400' }],
'body3': ['14px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '500' }], // Helvetica Neue
```

---

## Mappenstructuur

```
burcht-ter-cleeff/
├── app/
│   ├── layout.tsx                  # Root layout: nav + footer
│   ├── page.tsx                    # Homepage (Ontdek)
│   ├── verhuur/
│   │   └── page.tsx
│   ├── speelregels/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── dagticket/
│   │   └── page.tsx                # Tikkie flow
│   ├── kiosk/
│   │   └── page.tsx                # Kiosk-modus (groot scherm, buiten)
│   ├── mijn-omgeving/
│   │   ├── layout.tsx              # Clerk auth guard
│   │   └── page.tsx
│   └── api/
│       ├── tikkie/
│       │   ├── create/route.ts     # Tikkie betaallink aanmaken
│       │   └── webhook/route.ts    # Betaling bevestigd → Supabase
│       ├── reserveringen/
│       │   ├── route.ts            # GET beschikbaarheid, POST nieuwe boeking
│       │   └── [id]/route.ts
│       └── notificaties/
│           └── route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Desktop + mobile (hamburger)
│   │   └── Footer.tsx              # Sienna achtergrond, kasteel illustratie
│   ├── ui/
│   │   ├── Button.tsx              # Variants: primary, ghost, arrow, text-arrow
│   │   ├── StatusBadge.tsx         # Open/Gesloten/Verhuurd — filled + outline
│   │   ├── Toggle.tsx
│   │   ├── Input.tsx               # Text + error state
│   │   ├── Select.tsx              # Dropdown
│   │   └── Calendar.tsx            # Beschikbaarheidskalender (groen/rood dots)
│   ├── sections/
│   │   ├── Hero.tsx                # Full-bleed foto, H1, status badge
│   │   ├── FeatureCards.tsx        # 3-koloms kaarten (homepage)
│   │   ├── Quote.tsx               # Grote tekst + iconen
│   │   ├── VerhuurCTA.tsx          # Foto links, tekst rechts
│   │   └── NewsletterBar.tsx       # Email input in footer
│   ├── dagticket/
│   │   ├── TicketSelector.tsx      # Aantal kiezen, Tikkie QR genereren
│   │   └── BetaaldScherm.tsx       # Bevestigingsscherm na betaling
│   └── mijn-omgeving/
│       ├── ProfielSection.tsx
│       ├── VerhuurSection.tsx      # Kalender + historielijst
│       ├── KaartjesSection.tsx     # Bestellen CTA + historielijst
│       └── NotificatiesSection.tsx # Toggle-instellingen
├── lib/
│   ├── supabase.ts                 # Supabase client
│   ├── tikkie.ts                   # Tikkie API wrapper
│   └── utils.ts
├── public/
│   ├── fonts/
│   │   ├── GTWalsheimPro-Regular.woff2
│   │   └── GTWalsheimPro-Medium.woff2
│   └── images/
│       └── (alle foto's + SVG assets)
└── types/
    ├── reservering.ts
    ├── ticket.ts
    └── user.ts
```

---

## Supabase Schema

```sql
-- Reserveringen (verhuur)
create table reserveringen (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,           -- Clerk user ID
  datum date not null unique,      -- één boeking per dag
  naam text,
  omschrijving text,
  status text default 'bevestigd', -- bevestigd | geannuleerd
  created_at timestamptz default now()
);

-- Tickettransacties (Tikkie webhooks)
create table tickets (
  id uuid primary key default gen_random_uuid(),
  user_id text,                    -- optioneel, als ingelogd
  tikkie_payment_id text unique,
  aantal int not null,
  bedrag_cents int not null,
  datum date not null,
  status text default 'betaald',
  created_at timestamptz default now()
);

-- Notificatie-instellingen
create table notificaties (
  user_id text primary key,
  nieuwsbrief boolean default true,
  updates_kaartjes boolean default true,
  updates_verhuur boolean default false
);
```

---

## Tikkie Integratie

### Flow dagticket
1. Bezoeker kiest aantal tickets op `/dagticket`
2. `POST /api/tikkie/create` → Tikkie API → retourneert betaallink
3. Bezoeker wordt doorgestuurd naar Tikkie/bank-app
4. Na betaling: redirect naar `/dagticket?status=betaald&ref={id}`
5. Tikkie stuurt webhook naar `POST /api/tikkie/webhook`
6. Webhook slaat transactie op in Supabase `tickets` tabel
7. Bevestigingsscherm toont: ✓ Betaald, aantal tickets, datum

### Kiosk-modus (`/kiosk`)
- Zelfde flow, groot formaat UI
- Geen navigatie, geen footer
- Auto-reset na 60 seconden inactiviteit
- Fullscreen mode via `?fullscreen=true`

---

## Clerk Auth

```tsx
// app/mijn-omgeving/layout.tsx
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function Layout({ children }) {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  return <>{children}</>
}
```

Clerk levert ook de `/sign-in` en `/sign-up` pagina's. Stijl aanpassen via Clerk's `appearance` prop met onze Forest + Ivory tokens.

---

## Pagina Overzicht

| Route | Pagina | Prioriteit |
|---|---|---|
| `/` | Homepage (Ontdek) | 1 |
| `/verhuur` | Verhuurpagina | 2 |
| `/speelregels` | Speelregels | 3 |
| `/contact` | Contactformulier | 4 |
| `/dagticket` | Tikkie ticketflow | 5 |
| `/mijn-omgeving` | Account dashboard | 6 |
| `/kiosk` | Buitenterminal modus | 7 |

---

## UI Component Gedrag

### Button variants
```
primary     → bg-forest text-white, hover: bg-forest/90, border-radius: full
ghost       → border border-forest text-forest, hover: bg-forest/10
arrow       → cirkel met →, bg-forest, hover: scale-105
text-arrow  → tekst + → icon inline
caramel     → bg-caramel text-white (gebruikt op ivory achtergrond)
sienna      → bg-sienna text-white (footer context)
```

### StatusBadge
```
open        → bg-forest text-white + klok icoon
gesloten    → bg-sienna text-white + klok icoon
verhuurd    → bg-caramel text-white + klok icoon
outline     → border variant van elk, transparante achtergrond
```

### Calendar (Mijn Omgeving)
```
beschikbaar dag  → groene dot onder datum
verhuurd dag     → rode dot onder datum
geselecteerd     → forest achtergrond, wit cijfer
vandaag          → bold cijfer
buiten maand     → grey tekst
```

---

## Bouwvolgorde

**Fase 1 — Fundament**
1. Next.js project aanmaken + Tailwind + design tokens configureren
2. Fonts installeren (GT Walsheim Pro als local font)
3. Navbar + Footer bouwen
4. Homepage bouwen

**Fase 2 — Marketing pagina's**
5. Verhuur
6. Speelregels
7. Contact (met formulier → mailto of Resend)

**Fase 3 — Tikkie flow**
8. Supabase opzetten + schema uitrollen
9. Dagticket pagina + Tikkie API koppeling
10. Webhook handler + bevestigingsscherm
11. Kiosk-modus

**Fase 4 — Mijn Omgeving**
12. Clerk installeren + auth guard
13. Profiel sectie
14. Verhuurkalender + reservering flow
15. Kaartjes sectie (koppeling Supabase tickets)
16. Notificatie-instellingen

**Fase 5 — Afwerking**
17. Mobile responsiveness doorlopen
18. SEO (metadata, OG tags)
19. Vercel deployment + domein koppelen

---

## Omgevingsvariabelen

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Tikkie
TIKKIE_API_KEY=
TIKKIE_APP_TOKEN=
TIKKIE_IBAN=                        # Stichting IBAN

# Optioneel: e-mail (contactformulier)
RESEND_API_KEY=
```

---

## Notities

- **GT Walsheim Pro** is een betaald font. Zorg dat de licentie de webfonts toestaat, of gebruik de files die al in het huidige WordPress-project staan.
- **Tikkie sandbox** beschikbaar voor testen vóór live gang: [developer.abnamro.com/tikkie](https://developer.abnamro.com/tikkie)
- **Stichtingstarief Tikkie** vereist Rabobank zakelijke rekening op naam van de stichting. Dit traject loopt los van de bouw.
- De **kasteel-illustratie** (battlements + vlag) in de footer is een SVG asset — exporteer uit Figma als SVG voor scherpte op alle schermen.
