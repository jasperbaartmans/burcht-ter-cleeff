import Button from '@/components/ui/Button'

interface Props {
  data?: {
    tekst?: string
    email?: string
  }
}

export default function SpeelregelsFeedbackCTA({ data }: Props) {
  const tekst = data?.tekst ?? 'Ideeën, tips en suggesties zijn altijd welkom. Je kunt ze doorgeven bij het bestuur van de speeltuinvereniging.'
  const email = data?.email ?? 'info@burchttercleeff.nl'

  return (
    <section className="bg-ivory border-t border-grey py-20 md:py-28 px-6 text-center">
      <div className="max-w-[600px] mx-auto flex flex-col items-center gap-8">
        <p className="text-[26px] leading-[32px] tracking-[-0.02em] md:text-h3 font-dm-sans text-black">
          {tekst}
        </p>
        <Button as="link" href={`mailto:${email}`} variant="caramel" size="md">
          Mail ons
        </Button>
      </div>
    </section>
  )
}
