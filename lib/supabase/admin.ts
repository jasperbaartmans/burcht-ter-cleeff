import { createClient } from '@supabase/supabase-js'

/**
 * Supabase admin client met service role key.
 * Bypassed RLS — uitsluitend gebruiken in server-side webhook handlers.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
