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
      ],
    }),

    defineField({
      name: 'intro',
      title: 'Intro sectie',
      type: 'object',
      fields: [
        defineField({ name: 'tekst', title: 'Tekst', type: 'text', rows: 3 }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Contact pagina' }),
  },
})
