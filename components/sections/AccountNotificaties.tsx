'use client'

import { useState } from 'react'
import Toggle from '@/components/ui/Toggle'
import { SectionRow } from './AccountProfile'

export default function AccountNotificaties() {
  const [nieuwsbrief, setNieuwsbrief] = useState(true)
  const [kaartjes, setKaartjes] = useState(true)
  const [verhuur, setVerhuur] = useState(false)

  return (
    <SectionRow label="Notificaties">
      <div className="flex flex-col gap-1">
        <p className="text-body3 font-walsheim text-forest mb-3">E-mails</p>

        <ToggleRow
          label="Nieuwsbrief"
          checked={nieuwsbrief}
          onChange={setNieuwsbrief}
        />
        <ToggleRow
          label="Updates over kaartjes"
          checked={kaartjes}
          onChange={setKaartjes}
        />
        <ToggleRow
          label="Updates over verhuur"
          checked={verhuur}
          onChange={setVerhuur}
        />
      </div>
    </SectionRow>
  )
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-grey last:border-0">
      <span className="text-body2 font-walsheim text-black">{label}</span>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}
