'use client'

import { useState } from 'react'

type DayStatus = 'available' | 'booked' | 'past'

interface MiniCalendarProps {
  /** Geblokkeerde datums als YYYY-MM-DD strings (geboekt of in behandeling) */
  bookedDates?: string[]
  onSelect?: (date: Date) => void
}

const DAYS_NL = ['M', 'D', 'W', 'D', 'V', 'Z', 'Z']

const MONTHS_NL = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December',
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

// Maandag = 0, ..., Zondag = 6
function getStartOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return (day + 6) % 7
}

function toDateString(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function MiniCalendar({ bookedDates = [], onSelect }: MiniCalendarProps) {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [selected, setSelected] = useState<string | null>(null)

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const daysInMonth = getDaysInMonth(year, month)
  const startOffset = getStartOffset(year, month)
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  function getStatus(year: number, month: number, day: number): DayStatus {
    const date = new Date(year, month, day)
    if (date < today) return 'past'
    const dateStr = toDateString(year, month, day)
    if (bookedDates.includes(dateStr)) return 'booked'
    return 'available'
  }

  function handleSelect(day: number) {
    const status = getStatus(year, month, day)
    if (status !== 'available') return
    const dateStr = toDateString(year, month, day)
    setSelected(dateStr)
    onSelect?.(new Date(year, month, day))
  }

  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year

  return (
    <div className="w-full max-w-[380px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-grey transition-colors"
          aria-label="Vorige maand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#262628" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#262628" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18L15 12L9 6" />
          </svg>
        </button>
      </div>

      {/* Dagnamen */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_NL.map((d, i) => (
          <div key={i} className="text-center text-body3 font-dm-sans text-black/40 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Dagen */}
      <div className="grid grid-cols-7">
        {Array.from({ length: totalCells }).map((_, i) => {
          const day = i - startOffset + 1
          const isValid = day >= 1 && day <= daysInMonth
          const dateStr = isValid ? toDateString(year, month, day) : null
          const isToday = isCurrentMonth && day === today.getDate()
          const isSelected = dateStr === selected
          const status = isValid ? getStatus(year, month, day) : null

          return (
            <div key={i} className="flex flex-col items-center py-1">
              {isValid ? (
                <button
                  onClick={() => handleSelect(day)}
                  disabled={status === 'past' || status === 'booked'}
                  aria-label={dateStr ?? undefined}
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-body3 font-dm-sans transition-colors',
                    isSelected
                      ? 'bg-forest text-white'
                      : isToday && status === 'available'
                      ? 'border border-forest text-forest hover:bg-grey'
                      : status === 'past'
                      ? 'text-black/25 cursor-default'
                      : status === 'booked'
                      ? 'text-black/40 cursor-default'
                      : 'text-black hover:bg-grey cursor-pointer',
                  ].join(' ')}
                >
                  {day}
                </button>
              ) : (
                <span className="w-8 h-8" />
              )}
              {/* Statusstipje */}
              {isValid && status === 'available' && (
                <span className="w-1.5 h-1.5 rounded-full mt-0.5 bg-forest" />
              )}
              {isValid && status === 'booked' && (
                <span className="w-1.5 h-1.5 rounded-full mt-0.5 bg-sienna" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
