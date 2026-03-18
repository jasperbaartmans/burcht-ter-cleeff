import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://burchttercleeff.nl',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://burchttercleeff.nl/verhuur',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://burchttercleeff.nl/contact',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://burchttercleeff.nl/speelregels',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
