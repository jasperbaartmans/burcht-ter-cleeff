'use server'

import nodemailer from 'nodemailer'

export type ContactFormState = {
  success: boolean
  error?: string
}

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const naam = formData.get('naam') as string
  const email = formData.get('email') as string
  const telefoon = formData.get('telefoon') as string
  const bericht = formData.get('bericht') as string

  if (!naam || !email || !bericht) {
    return { success: false, error: 'Vul alle verplichte velden in.' }
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Burcht ter Cleeff Website" <${process.env.SMTP_USER}>`,
      to: 'info@burchtercleeff.nl',
      replyTo: email,
      subject: `Contactformulier: bericht van ${naam}`,
      text: `Naam: ${naam}\nE-mail: ${email}\nTelefoon: ${telefoon || '—'}\n\n${bericht}`,
      html: `
        <table style="font-family:Arial,sans-serif;font-size:15px;color:#262628;border-collapse:collapse;width:100%;max-width:560px">
          <tr><td style="padding:8px 0;border-bottom:1px solid #e0e1da"><strong>Naam</strong></td><td style="padding:8px 0 8px 16px;border-bottom:1px solid #e0e1da">${naam}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e0e1da"><strong>E-mail</strong></td><td style="padding:8px 0 8px 16px;border-bottom:1px solid #e0e1da"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e0e1da"><strong>Telefoon</strong></td><td style="padding:8px 0 8px 16px;border-bottom:1px solid #e0e1da">${telefoon || '—'}</td></tr>
          <tr><td style="padding:8px 0" valign="top"><strong>Bericht</strong></td><td style="padding:8px 0 8px 16px;white-space:pre-wrap">${bericht}</td></tr>
        </table>
      `,
    })

    return { success: true }
  } catch (err) {
    console.error('Mail error:', err)
    return { success: false, error: 'Er is iets misgegaan. Probeer het later opnieuw.' }
  }
}
