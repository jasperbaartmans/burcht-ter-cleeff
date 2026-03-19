'use client'

import { useState, useEffect } from 'react'
import MiniCalendar from '@/components/ui/MiniCalendar'
import { SectionRow } from './AccountProfile'
import { createClient } from '@/lib/supabase/client'

type Reservation = {
  id: string
  date: string
  status: string
  notes: string | null
  user_id: string
}

const MONTHS_SHORT = [
  'jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
  'jul', 'aug', 'sep', 'okt', 'nov', 'dec',
]
const WEEK_LONG = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za']

/** YYYY-MM-DD → "Wo, 11 sep 2024" */
function formatShort(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return `${WEEK_LONG[date.getDay()]}, ${d} ${MONTHS_SHORT[m - 1]} ${y}`
}

/** YYYY-MM-DD → "woensdag 11 september" */
function formatLong(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('nl-NL', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

const inputClass =
  'w-full bg-white rounded-xl px-4 py-3 text-body2 font-dm-sans text-black border border-grey focus:outline-none focus:border-forest transition-colors'
const labelClass = 'text-body3 font-dm-sans text-forest mb-1 block'

export default function AccountVerhuur() {
  const [allBooked, setAllBooked] = useState<string[]>([])
  const [myReservations, setMyReservations] = useState<Reservation[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const [{ data: reservations }, { data: { user } }] = await Promise.all([
        supabase
          .from('reservations')
          .select('id, date, status, notes, user_id')
          .in('status', ['paid', 'pending']),
        supabase.auth.getUser(),
      ])

      const all = reservations ?? []
      setAllBooked(all.map((r) => r.date))
      setMyReservations(
        all.filter((r) => r.user_id === user?.id && r.status === 'paid')
      )
    }
    fetchData()
  }, [])

  async function handleReserveer() {
    if (!selectedDate || loading) return
    setLoading(true)
    setError(null)

    const res = await fetch('/api/reserveer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate, notes: notes.trim() || undefined }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Er ging iets mis, probeer het opnieuw.')
      setLoading(false)
      return
    }

    // Doorsturen naar Tikkie betaalpagina
    window.location.href = data.paymentUrl
  }

  return (
    <SectionRow label="Verhuur">
      <div className="flex flex-col gap-8">

        {/* Reserveren */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-body3 font-dm-sans text-forest mb-1">Reserveren</p>
            <p className="text-body2 font-dm-sans text-black">
              Kies een dag in de kalender om de speeltuin te reserveren.
              Dagen met een groene stip zijn nog beschikbaar.
            </p>
          </div>

          <MiniCalendar
            bookedDates={allBooked}
            onSelect={(date) => {
              const iso = [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, '0'),
                String(date.getDate()).padStart(2, '0'),
              ].join('-')
              setSelectedDate(iso)
              setNotes('')
              setError(null)
            }}
          />

          {/* Boekingspaneel */}
          {selectedDate && (
            <div className="border border-grey rounded-2xl p-5 flex flex-col gap-4">
              <div>
                <p className={labelClass}>Geselecteerde datum</p>
                <p className="text-body2 font-dm-sans text-black capitalize">
                  {formatLong(selectedDate)}
                </p>
                <p className="text-body3 font-dm-sans text-black/50 mt-0.5">
                  09:00 – 13:00 uur &middot; €40,–
                </p>
              </div>

              <div>
                <label className={labelClass}>Omschrijving (optioneel)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="bijv. Verjaardag van Lieke"
                  className={inputClass}
                />
              </div>

              {error && (
                <p className="text-body3 font-dm-sans text-sienna">{error}</p>
              )}

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleReserveer}
                  disabled={loading}
                  className="bg-caramel text-white rounded-full px-6 py-3 text-body3 font-dm-sans font-medium hover:bg-[#9a6820] transition-colors disabled:opacity-60"
                >
                  {loading ? 'Bezig…' : 'Reserveer & betaal — €40,–'}
                </button>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-body3 font-dm-sans text-black/40 hover:text-black transition-colors"
                >
                  Annuleren
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Historie — alleen als er eigen reserveringen zijn */}
        {myReservations.length > 0 && (
          <div>
            <p className="text-body3 font-dm-sans text-forest mb-3">Historie</p>
            <div className="flex flex-col divide-y divide-grey">
              {myReservations
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((res) => (
                  <div key={res.id} className="flex justify-between items-center py-3 gap-4">
                    <span className="text-body2 font-dm-sans text-black shrink-0">
                      {formatShort(res.date)}
                    </span>
                    <span className="text-body2 font-dm-sans text-black/60 text-right">
                      {res.notes ?? ''}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

      </div>
    </SectionRow>
  )
}
