-- Voer dit uit in het Supabase SQL-editor:
-- Dashboard → SQL Editor → New query → plak dit → Run

-- Voeg admin_notes toe aan reservations
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Verbreed de status-opties (was: pending | paid | cancelled)
-- Nieuwe mogelijkheden: pending | paid | confirmed | completed | cancelled | no_show
-- Geen ENUM gebruikt zodat uitbreiden later eenvoudig blijft.

-- Indexen zijn al aanwezig; geen aanpassingen nodig.
