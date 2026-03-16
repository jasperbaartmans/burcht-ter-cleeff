'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function ContactContent() {
  const [form, setForm] = useState({ naam: '', email: '', telefoon: '', bericht: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    window.location.href = `mailto:info@burchttercleeff.nl?subject=Contactformulier&body=${encodeURIComponent(
      `Naam: ${form.naam}\nE-mail: ${form.email}\nTelefoon: ${form.telefoon}\n\n${form.bericht}`
    )}`
  }

  const inputClass =
    'w-full bg-white rounded-xl px-4 py-3 text-body2 font-walsheim text-black placeholder:text-black/30 border border-transparent focus:outline-none focus:border-forest transition-colors'

  return (
    <section className="bg-white py-14 md:py-20 px-6 md:px-10">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">

        {/* Left: image */}
        <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-0">
          <Image
            src="/images/schommel.jpg"
            alt="Kinderen spelen bij Speeltuin Burcht ter Cleeff"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right: form card */}
        <div className="bg-ivory rounded-2xl p-7 md:p-10 flex flex-col gap-6">
          <p className="text-body2 font-walsheim text-black/70">
            Vul het formulier in of neem direct contact op via de mail.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Naam */}
            <div className="grid grid-cols-[90px_1fr] items-center gap-3">
              <label htmlFor="naam" className="text-body2 font-walsheim text-forest">
                Naam
              </label>
              <input
                id="naam"
                name="naam"
                type="text"
                value={form.naam}
                onChange={handleChange}
                placeholder="James"
                className={inputClass}
              />
            </div>

            {/* E-mail */}
            <div className="grid grid-cols-[90px_1fr] items-center gap-3">
              <label htmlFor="email" className="text-body2 font-walsheim text-forest">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="james@gmail.com"
                className={inputClass}
              />
            </div>

            {/* Telefoon */}
            <div className="grid grid-cols-[90px_1fr] items-center gap-3">
              <label htmlFor="telefoon" className="text-body2 font-walsheim text-forest">
                Telefoon
              </label>
              <input
                id="telefoon"
                name="telefoon"
                type="tel"
                value={form.telefoon}
                onChange={handleChange}
                placeholder="0622652555"
                className={inputClass}
              />
            </div>

            {/* Bericht */}
            <div className="grid grid-cols-[90px_1fr] items-start gap-3">
              <label htmlFor="bericht" className="text-body2 font-walsheim text-forest pt-3">
                Bericht
              </label>
              <textarea
                id="bericht"
                name="bericht"
                rows={5}
                value={form.bericht}
                onChange={handleChange}
                placeholder="Type hier je bericht..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="primary" size="md">
                Verstuur
              </Button>
            </div>
          </form>
        </div>

      </div>
    </section>
  )
}
