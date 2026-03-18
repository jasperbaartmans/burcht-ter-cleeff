'use client'

export default function FooterNewsletter() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full">
      {/* Mobile: stacked */}
      <div className="flex flex-col gap-2 md:hidden">
        <input
          type="email"
          placeholder="Je e-mailadres"
          aria-label="E-mailadres voor nieuwsbrief"
          className="bg-white/10 border border-white/30 rounded-full px-5 py-3 text-body3 font-dm-sans text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 w-full transition-colors"
        />
        <button
          type="submit"
          className="bg-caramel text-white rounded-full px-6 py-3 text-body3 font-dm-sans font-medium hover:bg-[#9a6820] transition-colors w-full"
        >
          Blijf op de hoogte
        </button>
      </div>

      {/* Desktop: button inside pill */}
      <div className="hidden md:flex items-center bg-white/10 border border-white/30 rounded-full pl-5 pr-1.5 py-1.5 gap-3 w-[480px]">
        <input
          type="email"
          placeholder="Je e-mailadres"
          aria-label="E-mailadres voor nieuwsbrief"
          className="flex-1 bg-transparent text-body3 font-dm-sans text-white placeholder:text-white/50 focus:outline-none min-w-0"
        />
        <button
          type="submit"
          className="bg-caramel text-white rounded-full px-5 py-2 text-body3 font-dm-sans font-medium hover:bg-[#9a6820] transition-colors whitespace-nowrap shrink-0"
        >
          Blijf op de hoogte
        </button>
      </div>
    </form>
  )
}
