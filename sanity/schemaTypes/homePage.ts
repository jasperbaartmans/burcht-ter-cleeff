import { defineType, defineField } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepagina',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'h1', title: 'Koptekst (H1)', type: 'string' }),
        defineField({ name: 'statusLabel', title: 'Status label', type: 'string' }),
        defineField({ name: 'h1En', title: 'Koptekst (H1) — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
        defineField({ name: 'statusLabelEn', title: 'Status label — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
      ],
    }),

    defineField({
      name: 'featureCards',
      title: 'Feature kaarten',
      type: 'object',
      fields: [
        defineField({ name: 'h2', title: 'Koptekst (H2)', type: 'string' }),
        defineField({ name: 'h2En', title: 'Koptekst (H2) — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
        defineField({
          name: 'cards',
          title: 'Kaarten',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'body', title: 'Tekst', type: 'text', rows: 3 }),
                defineField({ name: 'labelEn', title: 'Label — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
                defineField({ name: 'bodyEn', title: 'Tekst — Engels', type: 'text', rows: 3, description: 'Automatisch ingevuld via vertaling' }),
                defineField({
                  name: 'image',
                  title: 'Afbeelding',
                  type: 'image',
                  options: { hotspot: true },
                }),
                defineField({ name: 'alt', title: 'Alt-tekst', type: 'string' }),
                defineField({ name: 'altEn', title: 'Alt-tekst — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
              ],
              preview: {
                select: { title: 'label', media: 'image' },
              },
            },
          ],
          validation: (r) => r.max(3),
        }),
      ],
    }),

    defineField({
      name: 'quote',
      title: 'Beschrijving sectie',
      type: 'object',
      fields: [
        defineField({ name: 'h2', title: 'Koptekst (H2)', type: 'text', rows: 2 }),
        defineField({ name: 'body1', title: 'Alinea 1', type: 'text', rows: 3 }),
        defineField({ name: 'body2', title: 'Alinea 2', type: 'text', rows: 3 }),
        defineField({ name: 'h2En', title: 'Koptekst (H2) — Engels', type: 'text', rows: 2, description: 'Automatisch ingevuld via vertaling' }),
        defineField({ name: 'body1En', title: 'Alinea 1 — Engels', type: 'text', rows: 3, description: 'Automatisch ingevuld via vertaling' }),
        defineField({ name: 'body2En', title: 'Alinea 2 — Engels', type: 'text', rows: 3, description: 'Automatisch ingevuld via vertaling' }),
      ],
    }),

    defineField({
      name: 'fullPhoto',
      title: 'Volledige foto',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Afbeelding',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'alt', title: 'Alt-tekst', type: 'string' }),
        defineField({ name: 'altEn', title: 'Alt-tekst — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
      ],
    }),

    defineField({
      name: 'verhuurCTA',
      title: 'Verhuur CTA',
      type: 'object',
      fields: [
        defineField({ name: 'h3', title: 'Koptekst (H3)', type: 'string' }),
        defineField({ name: 'body', title: 'Alinea 1', type: 'text', rows: 4 }),
        defineField({ name: 'body2', title: 'Alinea 2', type: 'text', rows: 3 }),
        defineField({ name: 'h3En', title: 'Koptekst (H3) — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
        defineField({ name: 'bodyEn', title: 'Alinea 1 — Engels', type: 'text', rows: 4, description: 'Automatisch ingevuld via vertaling' }),
        defineField({ name: 'body2En', title: 'Alinea 2 — Engels', type: 'text', rows: 3, description: 'Automatisch ingevuld via vertaling' }),
        defineField({
          name: 'image',
          title: 'Afbeelding',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Homepagina' }),
  },
})
