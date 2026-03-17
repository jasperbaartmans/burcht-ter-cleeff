'use client'

export default function FooterNewsletter() {
  return (
    <form className="flex flex-col md:flex-row gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Je e-mailadres"
        aria-label="E-mailadres voor nieuwsbrief"
        className="bg-white/10 border border-white/30 rounded-full px-4 py-2 text-body3 font-dm-sans text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 w-full md:w-56 transition-colors"
      />
      <button
        type="submit"
        className="bg-caramel text-white rounded-full px-6 py-2 text-body3 font-dm-sans font-medium hover:bg-[#9a6820] transition-colors whitespace-nowrap"
      >
        Blijf op de hoogte
      </button>
    </form>
  )
}
