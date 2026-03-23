-- Voer dit uit in het Supabase SQL-editor:
-- Dashboard → SQL Editor → New query → plak dit → Run

create table if not exists leden (
  id          uuid primary key default gen_random_uuid(),
  lidnummer   text unique not null,
  naam        text not null,
  email       text not null,
  adres       text not null default '',
  postcode    text not null default '',
  plaats      text not null default '',
  telefoon    text not null default '',
  betaalwijze text not null default 'iDEAL',
  -- betaalwijze: 'iDEAL' | 'Incasso' | 'Factuur' | 'Contant' | 'Gratis' | 'Overboeking'
  geldig_tot  date not null,
  notitie     text,
  created_at  timestamptz default now()
);

create index if not exists leden_lidnummer_idx  on leden(lidnummer);
create index if not exists leden_geldig_tot_idx on leden(geldig_tot);

-- Row Level Security
alter table leden enable row level security;

-- Alleen service role (beheerder) mag leden lezen en bewerken.
-- Geen publieke policies — leden worden uitsluitend via admin-client benaderd.

-- Fictieve testleden
insert into leden (lidnummer, naam, email, adres, postcode, plaats, telefoon, betaalwijze, geldig_tot, notitie)
values
  (
    'L0001',
    'Familie De Vries',
    'devries@voorbeeld.nl',
    'Leidsevaart 45',
    '2014 HD',
    'Haarlem',
    '06-12345678',
    'iDEAL',
    '2027-03-01',
    null
  ),
  (
    'L0002',
    'Familie Bakker',
    'bakker@voorbeeld.nl',
    'Kennemerplein 12',
    '2011 MK',
    'Haarlem',
    '06-87654321',
    'Incasso',
    '2026-04-15',
    'Belt liever dan e-mail.'
  ),
  (
    'L0003',
    'Familie Jansen',
    'jansen@voorbeeld.nl',
    'Florapark 3',
    '2012 HK',
    'Haarlem',
    '06-11223344',
    'Contant',
    '2025-12-31',
    'Lidmaatschap verlopen, nog niet verlengd.'
  )
on conflict (lidnummer) do nothing;
