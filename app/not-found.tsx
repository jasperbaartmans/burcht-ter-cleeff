import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sub3 text-moss uppercase tracking-widest mb-4">Pagina niet gevonden</p>
      <h1 className="text-h1 text-black mb-6">404</h1>
      <p className="text-body1 text-black max-w-md mb-10">
        De pagina die je zoekt bestaat niet of is verplaatst.
      </p>
      <Link
        href="/"
        className="inline-block bg-forest text-white text-sub3 px-8 py-4 rounded-full hover:bg-black transition-colors duration-200"
      >
        Terug naar home
      </Link>
    </div>
  )
}
