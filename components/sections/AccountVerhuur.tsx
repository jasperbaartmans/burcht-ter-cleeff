import MiniCalendar from '@/components/ui/MiniCalendar'
import { SectionRow } from './AccountProfile'

const verhuurHistorie = [
  { date: 'Woe, 22 juni 2024', event: 'Eindejaarsfeest groep 5' },
  { date: 'Zat, 9 maart 2024', event: 'Verjaardag van Lieke' },
  { date: 'Vrij, 11 november 2023', event: 'Verjaardag van Sebastiaan' },
]

// September 2024: month=8, year=2024
const BOOKED_DAYS = [12, 13, 19, 25, 28]
const AVAILABLE_DAYS = [11, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 26, 27, 29, 30]

export default function AccountVerhuur() {
  return (
    <SectionRow label="Verhuur">
      <div className="flex flex-col gap-8">
        {/* Reserveren */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-body3 font-dm-sans text-forest mb-1">Reserveren</p>
            <p className="text-body2 font-dm-sans text-black/60">
              Kies een dag in de kalender om de speeltuin te reserveren.
              Dagen met een groene stip zijn nog beschikbaar.
            </p>
          </div>
          <MiniCalendar
            bookedDays={BOOKED_DAYS}
            availableDays={AVAILABLE_DAYS}
            initialMonth={8}
            initialYear={2024}
          />
        </div>

        {/* Historie */}
        <div>
          <p className="text-body3 font-dm-sans text-forest mb-3">Historie</p>
          <div className="flex flex-col divide-y divide-grey">
            {verhuurHistorie.map((item) => (
              <div key={item.date} className="flex justify-between items-center py-3">
                <span className="text-body2 font-dm-sans text-black">{item.date}</span>
                <span className="text-body2 font-dm-sans text-black/40">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionRow>
  )
}
