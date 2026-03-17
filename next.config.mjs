/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholder images worden ingewisseld voor echte foto's
    // Zet unoptimized op false zodra je echte foto's hebt toegevoegd
    unoptimized: false,
  },
  serverExternalPackages: ['nodemailer'],
  experimental: {
    // Middleware draaien in Node.js runtime i.p.v. Edge Runtime
    // Fix voor: ReferenceError: __dirname is not defined
    nodeMiddleware: true,
  },
}

export default nextConfig
