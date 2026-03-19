import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { HomePageData } from '@/lib/sanity/queries'

interface Props {
  data?: HomePageData['fullPhoto']
}

export default function FullPhoto({ data }: Props) {
  const imgSrc =
    data?.image && typeof data.image === 'object' && '_type' in data.image
      ? urlFor(data.image).width(1600).height(700).url()
      : '/images/schommel.jpg'
  const alt = data?.alt ?? 'Kind op de schommel in Speeltuin Burcht ter Cleeff'

  return (
    <section className="px-6 md:px-12 pt-8 md:pt-12 pb-0 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full aspect-[16/7] rounded-3xl overflow-hidden bg-grey">
          <Image
            src={imgSrc}
            alt={alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </div>
      </div>
    </section>
  )
}
