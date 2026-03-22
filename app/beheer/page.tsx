'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

const inputClass =
  'w-full bg-white rounded-xl px-4 py-3 text-body2 font-dm-sans text-black border border-grey focus:outline-none focus:border-sienna transition-colors'

const labelClass = 'text-body3 font-dm-sans text-sienna mb-1 block'

export default function BeheerLoginPage() {
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
      return
    }

    const res = await fetch('/api/beheer/check-admin')
    if (!res.ok) {
      await supabase.auth.signOut()
      setError('Je hebt geen toegang tot het beheerderspaneel.')
      setLoading(false)
      return
    }

    router.push('/beheer/dagtickets')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center pt-[69px]">
      <div className="w-full max-w-sm px-6 py-10">
        <p className="text-body3 font-dm-sans text-black/50 mb-2">Beheer</p>
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
          <Button type="submit" variant="sienna" size="md" disabled={loading} className="w-full justify-center">
            {loading ? 'Bezig...' : 'Inloggen'}
          </Button>
        </form>
      </div>
    </div>
  )
}
