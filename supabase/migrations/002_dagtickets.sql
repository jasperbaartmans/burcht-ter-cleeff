-- Voer dit uit in het Supabase SQL-editor:
-- Dashboard → SQL Editor → New query → plak dit → Run

create table if not exists dagtickets (
  id         uuid primary key default gen_random_uuid(),
  persons    integer not null check (persons >= 1 and persons <= 10),
  valid_date date not null default current_date,
  created_at timestamptz default now()
);

create index if not exists dagtickets_valid_date_idx on dagtickets(valid_date);

-- Row Level Security
alter table dagtickets enable row level security;

-- Iedereen (ook niet-ingelogd) mag een dagticket lezen op ID (voor QR-scan)
create policy "Public kan dagtickets lezen"
  on dagtickets for select
  to anon, authenticated
  using (true);

-- Alleen service role mag dagtickets aanmaken (via API route)
-- Service role bypassed RLS automatisch — geen insert policy nodig
