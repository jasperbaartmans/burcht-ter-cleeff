'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-body3 font-dm-sans text-white/80 py-3">
        Bedankt voor je inschrijving!
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Mobile: stacked */}
      <div className="flex flex-col gap-2 md:hidden">
        <input
          type="email"
          placeholder="Je e-mailadres"
          aria-label="E-mailadres voor nieuwsbrief"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/10 border border-white/30 rounded-full px-5 py-3 text-body3 font-dm-sans text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 w-full transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-caramel text-white rounded-full px-6 py-3 text-body3 font-dm-sans font-medium hover:bg-[#9a6820] transition-colors w-full disabled:opacity-60"
        >
          {status === 'loading' ? 'Bezig…' : 'Blijf op de hoogte'}
        </button>
        {status === 'error' && (
          <p className="text-sm text-red-300 px-1">Inschrijving mislukt, probeer het opnieuw.</p>
        )}
      </div>

      {/* Desktop: button inside pill */}
      <div className="hidden md:flex flex-col gap-2">
        <div className="flex items-center bg-white/10 border border-white/30 rounded-full pl-5 pr-1.5 py-1.5 gap-3 w-[480px]">
          <input
            type="email"
            placeholder="Je e-mailadres"
            aria-label="E-mailadres voor nieuwsbrief"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-transparent text-body3 font-dm-sans text-white placeholder:text-white/50 focus:outline-none min-w-0"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-caramel text-white rounded-full px-5 py-2 text-body3 font-dm-sans font-medium hover:bg-[#9a6820] transition-colors whitespace-nowrap shrink-0 disabled:opacity-60"
          >
            {status === 'loading' ? 'Bezig…' : 'Blijf op de hoogte'}
          </button>
        </div>
        {status === 'error' && (
          <p className="text-sm text-red-300 px-5">Inschrijving mislukt, probeer het opnieuw.</p>
        )}
      </div>
    </form>
  )
}
