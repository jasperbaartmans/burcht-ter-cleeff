import { createClient } from '@/lib/supabase/server'

/**
 * Controleert of de ingelogde gebruiker de beheerder is.
 * Vergelijkt het e-mailadres met ADMIN_EMAIL uit de omgevingsvariabelen.
 */
export async function getAdminUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null
  if (user.email !== process.env.ADMIN_EMAIL) return null

  return user
}
