import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

const singletonTypes = new Set(['homePage', 'speelregelsPage', 'verhuurPage', 'contactPage'])

export default defineConfig({
  name: 'burcht-ter-cleeff',
  title: 'Burcht ter Cleeff',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepagina')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.listItem()
              .title('Speelregels pagina')
              .id('speelregelsPage')
              .child(
                S.document()
                  .schemaType('speelregelsPage')
                  .documentId('speelregelsPage')
              ),
            S.listItem()
              .title('Verhuur pagina')
              .id('verhuurPage')
              .child(
                S.document()
                  .schemaType('verhuurPage')
                  .documentId('verhuurPage')
              ),
            S.listItem()
              .title('Contact pagina')
              .id('contactPage')
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId('contactPage')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
})
