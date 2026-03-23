import Image from 'next/image'

export default function VerhuurFullPhoto() {
  return (
    <section className="bg-ivory px-6 md:px-10 py-0 pb-16 md:pb-24">
      <div className="max-w-[1360px] mx-auto">
        <div className="relative w-full aspect-[4/3] md:aspect-[16/7] rounded-3xl overflow-hidden bg-grey">
          <Image
            src="/images/verhuur.jpg"
            alt="Kinderen vieren een verjaardag bij Speeltuin Burcht ter Cleeff"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 1360px"
          />
        </div>
      </div>
    </section>
  )
}
