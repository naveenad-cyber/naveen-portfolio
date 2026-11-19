import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the project root (silences the "multiple lockfiles" warning).
  outputFileTracingRoot: process.cwd(),
  // Lets you open the dev server from your phone / LAN IP without the cross-origin warning.
  allowedDevOrigins: ['192.168.56.1', '192.168.*.*', '10.*.*.*'],
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1280, 1600, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

export default nextConfig
