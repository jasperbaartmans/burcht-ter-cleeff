-- Voer dit uit in het Supabase SQL-editor:
-- Dashboard → SQL Editor → New query → plak dit → Run

create table if not exists reservations (
  id                uuid primary key default gen_random_uuid(),
  date              date unique not null,
  user_id           uuid references auth.users(id) not null,
  status            text not null default 'pending',
  -- status: 'pending' | 'paid' | 'cancelled'
  notes             text,
  tikkie_payment_id text,
  tikkie_payment_url text,
  created_at        timestamptz default now()
);

create index if not exists reservations_date_idx    on reservations(date);
create index if not exists reservations_user_idx    on reservations(user_id);
create index if not exists reservations_status_idx  on reservations(status);

-- Row Level Security
alter table reservations enable row level security;

-- Iedereen die ingelogd is mag alle reserveringen lezen (voor de kalender)
create policy "Authenticated users can view all reservations"
  on reservations for select
  to authenticated
  using (true);

-- Gebruikers mogen alleen hun eigen reserveringen aanmaken
create policy "Users can insert own reservations"
  on reservations for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Gebruikers mogen alleen hun eigen reserveringen bijwerken
create policy "Users can update own reservations"
  on reservations for update
  to authenticated
  using (auth.uid() = user_id);

-- Service role (webhook) kan alle records bijwerken — geen policy nodig,
-- service role bypassed RLS automatisch
