import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { profile } from '@/data/profile'
import { siteUrl } from '@/lib/site'
import { buildJsonLd, serializeJsonLd, siteDescription } from '@/lib/jsonld'

const sans = localFont({
  src: '../fonts/instrument-sans-latin-wght-normal.woff2',
  variable: '--font-sans',
  weight: '400 700',
  display: 'swap',
})

const mono = localFont({
  src: '../fonts/jetbrains-mono-latin-wght-normal.woff2',
  variable: '--font-mono',
  weight: '400 700',
  display: 'swap',
})

const title = `${profile.name} — ${profile.designation}`
const description = siteDescription

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  keywords: [
    'cybersecurity awareness',
    'security culture',
    'human risk management',
    'phishing simulation',
    'security awareness training',
    'cybersecurity consultant',
    'cybersecurity trainer',
    'ISO 27001 Lead Auditor',
    'NIST CSF',
    'GRC',
    'NextGen Identity',
    'Naveen A D',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    firstName: 'Naveen',
    lastName: 'A D',
    title,
    description,
    url: '/',
    siteName: `${profile.name} — Portfolio`,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030806',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-ink-950 font-sans text-fog antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
        {children}
      </body>
    </html>
  )
}
