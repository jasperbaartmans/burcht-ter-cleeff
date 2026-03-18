import { defineType, defineField } from 'sanity'

export const speelregelsPage = defineType({
  name: 'speelregelsPage',
  title: 'Speelregels pagina',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'h1', title: 'Koptekst (H1)', type: 'string' }),
      ],
    }),

    defineField({
      name: 'grid',
      title: 'Speelregels grid',
      type: 'object',
      fields: [
        defineField({ name: 'h2', title: 'Koptekst (H2)', type: 'string' }),
        defineField({
          name: 'regels',
          title: 'Regels',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'titel', title: 'Titel', type: 'string' }),
                defineField({ name: 'tekst', title: 'Tekst', type: 'text', rows: 3 }),
                defineField({
                  name: 'variant',
                  title: 'Kleur',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Licht (groen)', value: 'light' },
                      { title: 'Donker (bosgroen)', value: 'dark' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'light',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icoon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Risico (ster)', value: 'risk' },
                      { title: 'Afval (prullenbak)', value: 'trash' },
                      { title: 'Geen honden', value: 'noDog' },
                      { title: 'Fiets', value: 'bike' },
                      { title: 'Verboden te roken', value: 'noSmoke' },
                      { title: 'Speelgoed', value: 'toy' },
                      { title: 'Document', value: 'doc' },
                      { title: 'Persoon', value: 'person' },
                      { title: 'Shirt/kleding', value: 'shirt' },
                      { title: 'Ticket (toegang)', value: 'ticket' },
                      { title: 'Gebruiker met vinkje', value: 'userCheck' },
                    ],
                  },
                }),
              ],
              preview: {
                select: { title: 'titel', subtitle: 'variant' },
              },
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'feedbackCTA',
      title: 'Feedback CTA',
      type: 'object',
      fields: [
        defineField({ name: 'tekst', title: 'Tekst', type: 'text', rows: 3 }),
        defineField({ name: 'email', title: 'E-mailadres', type: 'string' }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Speelregels pagina' }),
  },
})
