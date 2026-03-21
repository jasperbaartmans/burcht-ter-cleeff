'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

const inputClass =
  'w-full bg-white rounded-xl px-4 py-3 text-body2 font-dm-sans text-black border border-grey focus:outline-none focus:border-forest transition-colors'

const labelClass = 'text-body3 font-dm-sans text-forest mb-1 block'

export default function InloggenPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-mailadres of wachtwoord onjuist.')
      setLoading(false)
    } else {
      const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '').split(',').map(e => e.trim().toLowerCase())
      const isAdmin = adminEmails.includes(data.user?.email?.toLowerCase() ?? '')
      router.push(isAdmin ? '/beheer/dagtickets' : '/mijn-omgeving')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center pt-[69px]">
      <div className="w-full max-w-sm px-6 py-10">
        <h1 className="text-h2 font-dm-sans text-black mb-8">Inloggen</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className={labelClass}>E-mailadres</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>Wachtwoord</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          {error && <p className="text-body3 font-dm-sans text-sienna">{error}</p>}
          <Button type="submit" variant="primary" size="md" disabled={loading} className="w-full justify-center">
            {loading ? 'Bezig...' : 'Inloggen'}
          </Button>
        </form>
        <p className="mt-6 text-body3 font-dm-sans text-black">
          Nog geen account?{' '}
          <Link href="/registreren" className="text-forest hover:underline">
            Registreren
          </Link>
        </p>
      </div>
    </div>
  )
}
