import Image from 'next/image'

interface Props {
  data?: { h1?: string }
}

export default function VerhuurHero({ data }: Props) {
  return (
    <section className="relative w-full h-[55vh] min-h-[380px] max-h-[600px] overflow-hidden">
      <Image
        src="/images/verhuur.jpg"
        alt="Verhuur van Speeltuin Burcht ter Cleeff voor verjaardagen en evenementen"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />

      <div className="absolute inset-0 flex flex-col justify-end pb-10 md:pb-16">
        <div className="max-w-[1360px] mx-auto w-full px-6 md:px-10">
          <h1
            className="text-[42px] leading-[46px] tracking-[-0.03em] md:text-h1 font-dm-sans text-white"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}
          >
            {data?.h1 ?? 'Verhuur'}
          </h1>
        </div>
      </div>
    </section>
  )
}
