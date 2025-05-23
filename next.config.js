/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.untappd.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
