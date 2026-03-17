/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholder images worden ingewisseld voor echte foto's
    // Zet unoptimized op false zodra je echte foto's hebt toegevoegd
    unoptimized: false,
  },
  serverExternalPackages: ['nodemailer'],
}

export default nextConfig
