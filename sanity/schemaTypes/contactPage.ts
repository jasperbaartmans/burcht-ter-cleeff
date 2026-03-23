import { defineType, defineField } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact pagina',
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
        defineField({ name: 'tekst', title: 'Tekst', type: 'text', rows: 3 }),
        defineField({ name: 'tekstEn', title: 'Tekst — Engels', type: 'text', rows: 3, description: 'Automatisch ingevuld via vertaling' }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Contact pagina' }),
  },
})
