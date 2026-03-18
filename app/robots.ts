import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/mijn-omgeving',
        '/inloggen',
        '/registreren',
        '/dagticket',
        '/bedankt',
        '/test',
        '/stijlgids',
      ],
    },
    sitemap: 'https://burchttercleeff.nl/sitemap.xml',
  }
}
