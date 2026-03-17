/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholder images worden ingewisseld voor echte foto's
    // Zet unoptimized op false zodra je echte foto's hebt toegevoegd
    unoptimized: false,
  },
  serverExternalPackages: ['nodemailer'],
  webpack(config, { webpack }) {
    // @next/env gebruikt __dirname via ncc, wat niet bestaat in Edge Runtime (middleware)
    config.plugins.push(
      new webpack.DefinePlugin({ __dirname: JSON.stringify('/') })
    )
    return config
  },
}

export default nextConfig
