'use client'

import { useFormState, useFormStatus } from 'react-dom'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { sendContactEmail, type ContactFormState } from '@/app/actions/sendContactEmail'

const initialState: ContactFormState = { success: false }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="primary" size="md" disabled={pending}>
      {pending ? 'Versturen…' : 'Verstuur'}
    </Button>
  )
}

export default function ContactContent() {
  const [state, action] = useFormState(sendContactEmail, initialState)

  const inputClass =
    'w-full bg-white rounded-xl px-4 py-3 text-body2 font-dm-sans text-black placeholder:text-black/30 border border-transparent focus:outline-none focus:border-forest transition-colors'

  return (
    <section className="bg-white py-14 md:py-20 px-6 md:px-10">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">

        {/* Form card — first on mobile */}
        <div className="bg-ivory rounded-2xl p-7 md:p-10 flex flex-col gap-6 order-1 md:order-2">
          <p className="text-body2 font-dm-sans text-black">
            Vul het formulier in of neem direct contact op via de mail.
          </p>

          {state.success ? (
            <div className="flex flex-col gap-3 py-4">
              <p className="text-[22px] leading-[28px] tracking-[-0.02em] font-dm-sans text-black">
                <span className="text-forest">Bedankt voor je bericht!</span>
              </p>
              <p className="text-body2 font-dm-sans text-black">
                We hebben je bericht ontvangen en komen binnen enkele dagen bij je terug.
              </p>
            </div>
          ) : (
            <form action={action} className="flex flex-col gap-5">
              {/* Naam */}
              <div className="flex flex-col gap-1">
                <label htmlFor="naam" className="text-body2 font-dm-sans text-forest">
                  Naam
                </label>
                <input
                  id="naam"
                  name="naam"
                  type="text"
                  required
                  placeholder="James"
                  className={inputClass}
                />
              </div>

              {/* E-mail */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-body2 font-dm-sans text-forest">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="james@gmail.com"
                  className={inputClass}
                />
              </div>

              {/* Telefoon */}
              <div className="flex flex-col gap-1">
                <label htmlFor="telefoon" className="text-body2 font-dm-sans text-forest">
                  Telefoon
                </label>
                <input
                  id="telefoon"
                  name="telefoon"
                  type="tel"
                  placeholder="0622652555"
                  className={inputClass}
                />
              </div>

              {/* Bericht */}
              <div className="flex flex-col gap-1">
                <label htmlFor="bericht" className="text-body2 font-dm-sans text-forest">
                  Bericht
                </label>
                <textarea
                  id="bericht"
                  name="bericht"
                  rows={5}
                  required
                  placeholder="Type hier je bericht..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {state.error && (
                <p className="text-body3 font-dm-sans text-sienna">{state.error}</p>
              )}

              <div className="flex justify-end">
                <SubmitButton />
              </div>
            </form>
          )}
        </div>

        {/* Image — second on mobile, first on desktop */}
        <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-0 order-2 md:order-1">
          <Image
            src="/images/schommel.jpg"
            alt="Kinderen spelen bij Speeltuin Burcht ter Cleeff"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

      </div>
    </section>
  )
}
