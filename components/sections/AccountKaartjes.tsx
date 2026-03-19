import Link from 'next/link'
import { SectionRow } from './AccountProfile'

const kaartjesHistorie = [
  { date: 'Woe, 22 juni 2024', aantal: 2 },
  { date: 'Zon, 19 juni 2024', aantal: 14 },
  { date: 'Zon, 12 juni 2024', aantal: 2 },
]

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 3v9m0 0l-3-3m3 3l3-3" stroke="#78992B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 14h12" stroke="#78992B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function AccountKaartjes() {
  return (
    <SectionRow label="Kaartjes">
      <div className="flex flex-col gap-8">
        {/* Bestellen CTA */}
        <Link
          href="/dagticket"
          className="flex items-center justify-between group"
        >
          <div>
            <p className="text-body3 font-dm-sans text-forest mb-1">Bestellen</p>
            <p className="text-body2 font-dm-sans text-black">
              Bestel gemakkelijk online je kaartjes
            </p>
          </div>
          <svg
            width="20" height="20" viewBox="0 0 20 20" fill="none"
            className="text-forest shrink-0 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* Historie */}
        <div>
          <p className="text-body3 font-dm-sans text-forest mb-3">Historie</p>
          <div className="flex flex-col divide-y divide-grey">
            {kaartjesHistorie.map((item) => (
              <div key={item.date} className="flex items-center justify-between py-3">
                <span className="text-body2 font-dm-sans text-black">{item.date}</span>
                <div className="flex items-center gap-4">
                  <span className="text-body2 font-dm-sans text-black">
                    {item.aantal} {item.aantal === 1 ? 'ticket' : 'tickets'}
                  </span>
                  <button
                    aria-label="Download"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <DownloadIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionRow>
  )
}
