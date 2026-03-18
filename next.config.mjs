/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  serverExternalPackages: ['nodemailer'],
  transpilePackages: ['sanity', 'next-sanity', '@sanity/ui', '@sanity/vision'],
}
export default nextConfig
