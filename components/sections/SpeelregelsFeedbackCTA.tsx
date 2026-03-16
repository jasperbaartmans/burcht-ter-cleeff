import Button from '@/components/ui/Button'

export default function SpeelregelsFeedbackCTA() {
  return (
    <section className="bg-ivory border-t border-grey py-20 md:py-28 px-6 text-center">
      <div className="max-w-[600px] mx-auto flex flex-col items-center gap-8">
        <p className="text-[26px] leading-[34px] tracking-[-0.02em] md:text-h3 font-walsheim text-black">
          Ideeën, tips en suggesties zijn altijd welkom. Je kunt ze doorgeven bij het bestuur van de speeltuinvereniging.
        </p>
        <Button as="link" href="mailto:info@burchttercleeff.nl" variant="caramel" size="md">
          Mail ons
        </Button>
      </div>
    </section>
  )
}
