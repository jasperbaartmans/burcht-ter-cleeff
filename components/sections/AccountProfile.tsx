'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/components/providers/UserProvider'
import { createClient } from '@/lib/supabase/client'
import Toggle from '@/components/ui/Toggle'

const inputClass =
  'w-full bg-white rounded-xl px-4 py-3 text-body2 font-dm-sans text-black border border-grey focus:outline-none focus:border-forest transition-colors'

const labelClass = 'text-body3 font-dm-sans text-forest mb-1 block'

export default function AccountProfile() {
  const { user } = useUser()
  const [abonnement, setAbonnement] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    if (user) {
      setFirstName(user.user_metadata?.firstName ?? '')
      setLastName(user.user_metadata?.lastName ?? '')
    }
  }, [user])

  async function handleSave() {
    if (!user) return
    const supabase = createClient()
    await supabase.auth.updateUser({ data: { firstName, lastName } })
  }

  const email = user?.email ?? ''

  return (
    <SectionRow label="Profiel">
      <div className="flex flex-col gap-5">
        {/* Voornaam */}
        <div>
          <label htmlFor="voornaam" className={labelClass}>Voornaam</label>
          <input
            id="voornaam"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={handleSave}
            className={inputClass}
          />
        </div>

        {/* Achternaam */}
        <div>
          <label htmlFor="achternaam" className={labelClass}>Achternaam</label>
          <input
            id="achternaam"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={handleSave}
            className={inputClass}
          />
        </div>

        {/* E-mail — read-only */}
        <div>
          <label htmlFor="email" className={labelClass}>E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            readOnly
            className={`${inputClass} opacity-60 cursor-default`}
          />
        </div>

        {/* Abonnement */}
        <div className="flex items-center justify-between py-1">
          <div>
            <p className={labelClass}>Abonnement</p>
            <p className="text-body2 font-dm-sans text-black">Extra regel uitleg</p>
          </div>
          <Toggle checked={abonnement} onChange={setAbonnement} />
        </div>

        {/* Status */}
        <div className="flex items-center justify-between py-1">
          <div>
            <p className={labelClass}>Status</p>
            <p className="text-body2 font-dm-sans text-black">Betaald t/m 19 augustus 2024</p>
          </div>
          <span className="w-6 h-6 rounded-full bg-forest flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </SectionRow>
  )
}

export function SectionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-b border-grey">
      <div className="md:w-32 shrink-0">
        <span className="text-body2 font-dm-sans text-black">{label}</span>
      </div>
      <div className="flex-1 max-w-[560px]">{children}</div>
    </div>
  )
}
