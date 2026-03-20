// Vul hieronder de Tikkie-links in die je aanmaakt via de ABN AMRO Tikkie Persoonlijk app.
// Ga in de app naar "Tikkie aanmaken" → kies een vaste naam + bedrag → sla de link op.
const TIKKIE_LINKS: Record<number, string> = {
  2:  'https://tikkie.me/pay/fie91d82s7h22v0cn7gt',
  3:  'https://tikkie.me/pay/fie91d82s7h22v0cn7gt',
  4:  'https://tikkie.me/pay/fie91d82s7h22v0cn7gt',
  5:  'https://tikkie.me/pay/fie91d82s7h22v0cn7gt',
  6:  'https://tikkie.me/pay/fie91d82s7h22v0cn7gt',
  7:  'https://tikkie.me/pay/fie91d82s7h22v0cn7gt',
  8:  'https://tikkie.me/pay/fie91d82s7h22v0cn7gt',
  9:  'https://tikkie.me/pay/fie91d82s7h22v0cn7gt',
  10: 'https://tikkie.me/pay/fie91d82s7h22v0cn7gt',
}

const PRICE_PER_PERSON = 0.60
const VISITORS = Array.from({ length: 9 }, (_, i) => i + 2) // 2 t/m 10

function formatPrice(n: number) {
  return '€' + (n * PRICE_PER_PERSON).toFixed(2).replace('.', ',')
}

export default function DagticketForm() {
  return (
    <div className="max-w-[560px] mx-auto px-6 py-12 md:py-24">

      <h1 className="text-h3 font-dm-sans text-forest text-center mb-3">
        <span className="md:hidden">Dagkaartjes</span>
        <span className="hidden md:inline">Koop nu je dagkaartjes.</span>
      </h1>
      <p className="text-body2 font-dm-sans text-black text-center mb-10 md:mb-12">
        Kies het aantal bezoekers en je wordt direct doorgestuurd naar Tikkie.
      </p>

      {/* Lijst */}
      <div className="rounded-2xl border border-grey overflow-hidden">
        {VISITORS.map((n, i) => (
          <a
            key={n}
            href={TIKKIE_LINKS[n]}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between px-6 py-4 hover:bg-forest/5 transition-colors group ${
              i < VISITORS.length - 1 ? 'border-b border-grey' : ''
            }`}
          >
            <span className="text-body2 font-dm-sans text-black">
              {n} personen
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sub1 font-dm-sans text-forest font-medium">
                {formatPrice(n)}
              </span>
              <span className="text-forest/50 group-hover:text-forest transition-colors text-lg leading-none">
                →
              </span>
            </div>
          </a>
        ))}
      </div>

    </div>
  )
}
