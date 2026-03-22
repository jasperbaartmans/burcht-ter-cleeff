'use client'

import { useState, useRef } from 'react'
import { updateReservation } from './actions'

// ─── Types ───────────────────────────────────────────────────────────────────

type Reservation = {
  id: string
  date: string
  status: string
  notes: string | null
  admin_notes: string | null
  user_id: string
  user_email: string
  created_at: string
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { value: 'pending',   label: 'Aangevraagd' },
  { value: 'paid',      label: 'Betaald' },
  { value: 'confirmed', label: 'Bevestigd' },
  { value: 'completed', label: 'Afgerond' },
  { value: 'cancelled', label: 'Geannuleerd' },
  { value: 'no_show',   label: 'Niet verschenen' },
]

const STATUS_STYLE: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-800',
  paid:      'bg-blue-100 text-blue-800',
  confirmed: 'bg-teal-100 text-teal-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-stone-100 text-stone-500',
  no_show:   'bg-red-100 text-red-700',
}

function statusLabel(s: string) {
  return STATUS_OPTIONS.find((o) => o.value === s)?.label ?? s
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

const MONTHS_NL = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December',
]
const DAYS_SHORT = ['M', 'D', 'W', 'D', 'V', 'Z', 'Z']
const WEEK_LONG  = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']
const MONTHS_SHORT = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec']

function formatLong(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const day = WEEK_LONG[date.getDay()]
  return `${day.charAt(0).toUpperCase() + day.slice(1)} ${d} ${MONTHS_SHORT[m - 1]} ${y}`
}

function formatCreated(iso: string) {
  return new Date(iso).toLocaleDateString('nl-NL', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/Amsterdam',
  })
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getStartOffset(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7
}

function toISO(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

// ─── Admin Calendar ───────────────────────────────────────────────────────────

function AdminCalendar({
  bookedDates,
  selectedDate,
  onSelect,
}: {
  bookedDates: string[]
  selectedDate: string | null
  onSelect: (date: string) => void
}) {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear]   = useState(now.getFullYear())

  const daysInMonth  = getDaysInMonth(year, month)
  const startOffset  = getStartOffset(year, month)
  const totalCells   = Math.ceil((startOffset + daysInMonth) / 7) * 7
  const todayISO     = toISO(now.getFullYear(), now.getMonth(), now.getDate())

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1) }
    else setMonth((m) => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1) }
    else setMonth((m) => m + 1)
  }

  return (
    <div className="w-full max-w-[380px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-grey transition-colors"
          aria-label="Vorige maand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#262628" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
        <span className="text-body3 font-dm-sans font-medium text-black">
          {MONTHS_NL[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-grey transition-colors"
          aria-label="Volgende maand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#262628" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18L15 12L9 6" />
          </svg>
        </button>
      </div>

      {/* Dagnamen */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((d, i) => (
          <div key={i} className="text-center text-body3 font-dm-sans text-black/40 py-1">{d}</div>
        ))}
      </div>

      {/* Dagen */}
      <div className="grid grid-cols-7">
        {Array.from({ length: totalCells }).map((_, i) => {
          const day = i - startOffset + 1
          const isValid  = day >= 1 && day <= daysInMonth
          const dateStr  = isValid ? toISO(year, month, day) : null
          const isBooked = dateStr ? bookedDates.includes(dateStr) : false
          const isToday  = dateStr === todayISO
          const isSelected = dateStr === selectedDate
          const isPast   = dateStr ? dateStr < todayISO : false

          return (
            <div key={i} className="flex flex-col items-center py-1">
              {isValid ? (
                <button
                  onClick={() => dateStr && isBooked && onSelect(dateStr)}
                  disabled={!isBooked}
                  aria-label={dateStr ?? undefined}
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-body3 font-dm-sans transition-colors',
                    isSelected
                      ? 'bg-sienna text-white'
                      : isToday
                      ? 'border border-sienna text-sienna hover:bg-grey'
                      : isBooked && isPast
                      ? 'text-black/40 hover:bg-grey cursor-pointer'
                      : isBooked
                      ? 'text-black hover:bg-grey cursor-pointer'
                      : isPast
                      ? 'text-black/20 cursor-default'
                      : 'text-black/40 cursor-default',
                  ].join(' ')}
                >
                  {day}
                </button>
              ) : (
                <span className="w-8 h-8" />
              )}
              {isValid && isBooked && (
                <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isPast ? 'bg-black/20' : 'bg-sienna'}`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Reservation card ─────────────────────────────────────────────────────────

const inputClass =
  'w-full bg-white rounded-xl px-4 py-3 text-body2 font-dm-sans text-black border border-grey focus:outline-none focus:border-sienna transition-colors'
const labelClass = 'text-body3 font-dm-sans text-sienna mb-1 block'

function ReservationCard({
  reservation,
  isHighlighted,
  divRef,
}: {
  reservation: Reservation
  isHighlighted: boolean
  divRef: (el: HTMLDivElement | null) => void
}) {
  const today = new Date().toISOString().split('T')[0]
  const isPast = reservation.date < today

  const [status,     setStatus]     = useState(reservation.status)
  const [adminNotes, setAdminNotes] = useState(reservation.admin_notes ?? '')
  const [saving,     setSaving]     = useState(false)
  const [saved,      setSaved]      = useState(false)
  const [saveError,  setSaveError]  = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setSaveError(null)
    try {
      await updateReservation(reservation.id, status, adminNotes)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setSaveError('Opslaan mislukt. Probeer het opnieuw.')
    } finally {
      setSaving(false)
    }
  }

  const isDirty =
    status !== reservation.status ||
    adminNotes !== (reservation.admin_notes ?? '')

  return (
    <div
      ref={divRef}
      className={[
        'rounded-2xl border p-6 flex flex-col gap-5 transition-colors scroll-mt-8',
        isHighlighted ? 'border-sienna' : 'border-grey',
        isPast ? 'opacity-70' : '',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-body2 font-dm-sans text-black font-medium">
            {formatLong(reservation.date)}
          </p>
          <p className="text-body3 font-dm-sans text-black/50 mt-0.5">
            09:00 – 13:00 uur
          </p>
        </div>
        <span className={`text-body3 font-dm-sans px-3 py-1 rounded-full shrink-0 ${STATUS_STYLE[status] ?? 'bg-stone-100 text-stone-600'}`}>
          {statusLabel(status)}
        </span>
      </div>

      {/* Gebruikersinfo */}
      <div className="flex flex-col gap-1">
        <p className={labelClass}>Geboekt door</p>
        <p className="text-body2 font-dm-sans text-black">{reservation.user_email}</p>
        <p className="text-body3 font-dm-sans text-black/40">
          Aangevraagd op {formatCreated(reservation.created_at)}
        </p>
      </div>

      {/* Opmerking gebruiker */}
      {reservation.notes && (
        <div>
          <p className={labelClass}>Opmerking van gebruiker</p>
          <p className="text-body2 font-dm-sans text-black/70 bg-ivory rounded-xl px-4 py-3">
            {reservation.notes}
          </p>
        </div>
      )}

      <hr className="border-grey" />

      {/* Status aanpassen */}
      <div>
        <label className={labelClass}>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={inputClass}
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Beheerdersnotitie */}
      <div>
        <label className={labelClass}>Notitie (beheerder)</label>
        <textarea
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          rows={3}
          placeholder="Interne notitie, alleen zichtbaar voor de beheerder"
          className={inputClass + ' resize-none'}
        />
      </div>

      {/* Opslaan */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving || !isDirty}
          className="bg-sienna text-white rounded-full px-6 py-2.5 text-body3 font-dm-sans font-medium hover:bg-[#7a3a2e] transition-colors disabled:opacity-40"
        >
          {saving ? 'Opslaan…' : 'Opslaan'}
        </button>
        {saved && (
          <p className="text-body3 font-dm-sans text-green-700">Opgeslagen</p>
        )}
        {saveError && (
          <p className="text-body3 font-dm-sans text-sienna">{saveError}</p>
        )}
      </div>
    </div>
  )
}

// ─── Main client component ────────────────────────────────────────────────────

export default function BeheerVerhuurClient({
  reservations,
}: {
  reservations: Reservation[]
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const today = new Date().toISOString().split('T')[0]

  function handleCalendarSelect(date: string) {
    setSelectedDate(date)
    const el = cardRefs.current[date]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const bookedDates = reservations.map((r) => r.date)

  const upcoming = reservations
    .filter((r) => r.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  const past = reservations
    .filter((r) => r.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))

  const sorted = [...upcoming, ...past]

  // Stats
  const thisYear = new Date().getFullYear().toString()
  const totalThisYear = reservations.filter((r) => r.date.startsWith(thisYear)).length
  const upcomingCount = upcoming.length
  const completedCount = reservations.filter((r) => r.status === 'completed').length

  return (
    <div className="flex flex-col gap-10">

      {/* Kalender */}
      <div>
        <p className="text-body3 font-dm-sans text-sienna mb-4">Kalender</p>
        <AdminCalendar
          bookedDates={bookedDates}
          selectedDate={selectedDate}
          onSelect={handleCalendarSelect}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-grey p-5">
          <p className="text-body3 font-dm-sans text-black/50 mb-1">Dit jaar</p>
          <p className="text-h3 font-dm-sans text-sienna">{totalThisYear}</p>
        </div>
        <div className="rounded-2xl border border-grey p-5">
          <p className="text-body3 font-dm-sans text-black/50 mb-1">Aankomend</p>
          <p className="text-h3 font-dm-sans text-sienna">{upcomingCount}</p>
        </div>
        <div className="rounded-2xl border border-grey p-5">
          <p className="text-body3 font-dm-sans text-black/50 mb-1">Afgerond</p>
          <p className="text-h3 font-dm-sans text-sienna">{completedCount}</p>
        </div>
      </div>

      {/* Reserveringslijst */}
      <div>
        <p className="text-body3 font-dm-sans text-sienna mb-4">
          Reserveringen{sorted.length > 0 ? ` (${sorted.length})` : ''}
        </p>

        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-grey p-8 text-center">
            <p className="text-body2 font-dm-sans text-black/50">
              Nog geen verhuurafspraken gevonden.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {sorted.map((res) => (
              <ReservationCard
                key={res.id}
                reservation={res}
                isHighlighted={selectedDate === res.date}
                divRef={(el) => { cardRefs.current[res.date] = el }}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
