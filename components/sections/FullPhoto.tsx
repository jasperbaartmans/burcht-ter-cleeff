import Image from 'next/image'

export default function FullPhoto() {
  return (
    <section className="px-6 md:px-12 py-8 md:py-12 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full aspect-[16/7] rounded-3xl overflow-hidden bg-grey">
          <Image
            src="/images/schommel.jpg"
            alt="Kind op de schommel in Speeltuin Burcht ter Cleeff"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </div>
      </div>
    </section>
  )
}
