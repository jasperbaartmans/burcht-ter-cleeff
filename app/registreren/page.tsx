'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

const inputClass =
  'w-full bg-white rounded-xl px-4 py-3 text-body2 font-dm-sans text-black border border-grey focus:outline-none focus:border-forest transition-colors'

const labelClass = 'text-body3 font-dm-sans text-forest mb-1 block'

export default function RegistrerenPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center pt-[69px]">
        <div className="w-full max-w-sm px-6 py-10 text-center">
          <h1 className="text-h2 font-dm-sans text-black mb-4">Controleer je e-mail</h1>
          <p className="text-body2 font-dm-sans text-black">
            We hebben een bevestigingslink gestuurd naar <strong>{email}</strong>. Klik op de link om je account te activeren.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center pt-[69px]">
      <div className="w-full max-w-sm px-6 py-10">
        <h1 className="text-h2 font-dm-sans text-black mb-8">Registreren</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="voornaam" className={labelClass}>Voornaam</label>
            <input
              id="voornaam"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="achternaam" className={labelClass}>Achternaam</label>
            <input
              id="achternaam"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
            />
          </div>
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          {error && <p className="text-body3 font-dm-sans text-sienna">{error}</p>}
          <Button type="submit" variant="primary" size="md" disabled={loading} className="w-full justify-center">
            {loading ? 'Bezig...' : 'Account aanmaken'}
          </Button>
        </form>
        <p className="mt-6 text-body3 font-dm-sans text-black">
          Al een account?{' '}
          <Link href="/inloggen" className="text-forest hover:underline">
            Inloggen
          </Link>
        </p>
      </div>
    </div>
  )
}
