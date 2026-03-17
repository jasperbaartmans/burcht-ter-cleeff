'use client'

export default function NewsletterBar() {
  return (
    <form
      className="flex gap-2 w-full md:w-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Uw e-mailadres"
        aria-label="E-mailadres voor nieuwsbrief"
        className="bg-white/10 border border-white/30 rounded-full px-4 py-2 text-body3 font-dm-sans text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 w-full md:w-56 transition-colors"
      />
      <button
        type="submit"
        className="bg-white text-sienna rounded-full px-4 py-2 text-body3 font-dm-sans font-medium hover:bg-white/90 transition-colors whitespace-nowrap"
      >
        Aanmelden
      </button>
    </form>
  )
}
