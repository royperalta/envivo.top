/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
    // Otras configuraciones que puedas tener
}

module.exports = {
    ...nextConfig,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
      },
}