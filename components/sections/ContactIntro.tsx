interface Props {
  data?: { tekst?: string }
}

export default function ContactIntro({ data }: Props) {
  const tekst = data?.tekst ?? 'Wij helpen je graag! Of het nu gaat over verhuur, openingstijden of voorzieningen, wij beantwoorden ze voor je.'

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-10 border-t border-grey">
      <div className="max-w-[1360px] mx-auto">
        <p className="text-[32px] leading-[38px] tracking-[-0.03em] md:text-h2 font-dm-sans text-black max-w-[640px]">
          <span className="text-forest">Vragen?</span>{' '}
          {tekst}
        </p>
      </div>
    </section>
  )
}
