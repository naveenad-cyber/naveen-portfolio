const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL

/**
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://naveenad.com) so canonical, Open Graph,
 * sitemap and structured-data URLs are correct. See .env.example.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercel ? `https://${vercel}` : 'http://localhost:3000')
).replace(/\/$/, '')
