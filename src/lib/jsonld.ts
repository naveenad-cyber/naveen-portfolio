import { profile } from '@/data/profile'
import { siteUrl } from '@/lib/site'

export const siteDescription =
  'Cybersecurity Awareness & Culture Lead at NextGen Identity. 720+ hours of cybersecurity training delivered across India and Europe. Security culture, human risk management, phishing simulation and corporate security training.'

/** Expertise that is shown on the site (Skills, Experience and Training sections). */
export const knowsAbout = [
  'Cybersecurity Awareness',
  'Security Culture',
  'Governance, Risk and Compliance (GRC)',
  'ISO/IEC 27001',
  'NIST Cybersecurity Framework',
  'Security Consulting',
  'Cybersecurity Training',
]

export function buildJsonLd() {
  const sameAs = [profile.linkedin, profile.youtube, profile.github, profile.credly, profile.medium].filter(Boolean)
  const personId = `${siteUrl}/#person`

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: `${profile.name} — ${profile.designation}`,
    description: siteDescription,
    inLanguage: 'en',
    dateModified: new Date().toISOString(),
    mainEntity: {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      alternateName: profile.alternateName,
      jobTitle: profile.jobTitle,
      description: siteDescription,
      image: `${siteUrl}${profile.photo}`,
      url: siteUrl,
      sameAs,
      knowsAbout,
      worksFor: { '@type': 'Organization', name: profile.company },
      address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: profile.education.institution },
    },
  }
}

/** Serialise for a <script type="application/ld+json"> tag (escapes "<" so the tag cannot be broken out of). */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')
