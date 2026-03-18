'use client'

import { useState } from 'react'

type DayStatus = 'available' | 'booked' | 'none'

interface MiniCalendarProps {
  bookedDays?: number[]
  availableDays?: number[]
  initialMonth?: number // 0-indexed
  initialYear?: number
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

// Monday = 0, ..., Sunday = 6
function getStartOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return (day + 6) % 7
}

export default function MiniCalendar({
  bookedDays = [],
  availableDays = [],
  initialMonth,
  initialYear,
  onSelect,
}: MiniCalendarProps) {
  const now = new Date()
  const [month, setMonth] = useState(initialMonth ?? now.getMonth())
  const [year, setYear] = useState(initialYear ?? now.getFullYear())
  const [selected, setSelected] = useState<number | null>(null)

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

  function getStatus(day: number): DayStatus {
    if (bookedDays.includes(day)) return 'booked'
    if (availableDays.includes(day)) return 'available'
    return 'none'
  }

  function handleSelect(day: number) {
    setSelected(day)
    onSelect?.(new Date(year, month, day))
  }

  const today = new Date()
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#262628" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18L9 12L15 6" /></svg>
        </button>
        <span className="text-body3 font-dm-sans font-medium text-black">
          {MONTHS_NL[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-grey transition-colors"
          aria-label="Volgende maand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#262628" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18L15 12L9 6" /></svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_NL.map((d, i) => (
          <div key={i} className="text-center text-body3 font-dm-sans text-black/40 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {Array.from({ length: totalCells }).map((_, i) => {
          const day = i - startOffset + 1
          const isValid = day >= 1 && day <= daysInMonth
          const isToday = isCurrentMonth && day === today.getDate()
          const isSelected = day === selected
          const status = isValid ? getStatus(day) : 'none'

          return (
            <div key={i} className="flex flex-col items-center py-1">
              {isValid ? (
                <button
                  onClick={() => handleSelect(day)}
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-body3 font-dm-sans transition-colors',
                    isSelected
                      ? 'bg-forest text-white'
                      : isToday
                      ? 'border border-forest text-forest'
                      : 'text-black hover:bg-grey',
                  ].join(' ')}
                >
                  {day}
                </button>
              ) : (
                <span className="w-8 h-8" />
              )}
              {/* Status dot */}
              {isValid && status !== 'none' && (
                <span
                  className={[
                    'w-1.5 h-1.5 rounded-full mt-0.5',
                    status === 'available' ? 'bg-forest' : 'bg-sienna',
                  ].join(' ')}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
