import { defineType, defineField } from 'sanity'

export const verhuurPage = defineType({
  name: 'verhuurPage',
  title: 'Verhuur pagina',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'h1', title: 'Koptekst (H1)', type: 'string' }),
        defineField({ name: 'h1En', title: 'Koptekst (H1) — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
      ],
    }),

    defineField({
      name: 'intro',
      title: 'Intro sectie',
      type: 'object',
      fields: [
        defineField({ name: 'body1', title: 'Alinea 1', type: 'text', rows: 4 }),
        defineField({ name: 'body2', title: 'Alinea 2', type: 'text', rows: 4 }),
        defineField({ name: 'body1En', title: 'Alinea 1 — Engels', type: 'text', rows: 4, description: 'Automatisch ingevuld via vertaling' }),
        defineField({ name: 'body2En', title: 'Alinea 2 — Engels', type: 'text', rows: 4, description: 'Automatisch ingevuld via vertaling' }),
      ],
    }),

    defineField({
      name: 'stappen',
      title: 'Stappen sectie',
      type: 'object',
      fields: [
        defineField({ name: 'h2', title: 'Koptekst (H2)', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Ondertitel', type: 'string' }),
        defineField({ name: 'h2En', title: 'Koptekst (H2) — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
        defineField({ name: 'subtitleEn', title: 'Ondertitel — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
        defineField({
          name: 'items',
          title: 'Stappen',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'titel', title: 'Titel', type: 'string' }),
                defineField({ name: 'omschrijving', title: 'Omschrijving', type: 'string' }),
                defineField({ name: 'titelEn', title: 'Titel — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
                defineField({ name: 'omschrijvingEn', title: 'Omschrijving — Engels', type: 'string', description: 'Automatisch ingevuld via vertaling' }),
              ],
              preview: {
                select: { title: 'titel', subtitle: 'omschrijving' },
              },
            },
          ],
        }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Verhuur pagina' }),
  },
})
