import Button from '@/components/ui/Button'

export default function SpeelregelsCTA() {
  return (
    <section className="bg-ivory border-t border-grey py-20 md:py-28 px-6 text-center">
      <div className="max-w-[640px] mx-auto flex flex-col items-center gap-8">
        <h2 className="text-[26px] leading-[32px] tracking-[-0.02em] md:text-h3 font-dm-sans text-black">
          Om het leuk te houden voor iedereen hebben we een aantal speelregels
        </h2>
        <Button as="link" href="/speelregels" variant="caramel" size="md">
          Bekijk de speelregels
        </Button>
      </div>
    </section>
  )
}
