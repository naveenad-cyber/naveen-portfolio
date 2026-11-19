export interface Certification {
  /** Also the file name for the certificate image: public/certificates/<id>.png|jpg|webp */
  id: string
  name: string
  shortName: string
  issuer: string
  issued?: string
  expires?: string
  /** Shows a visible "to confirm" tag. */
  reviewNote?: string
  description: string
  /** Badge/logo shown on the card (public/cert-logos). */
  logo?: string
  /** 'cover' for logos with their own full-bleed background (e.g. CEH). */
  logoFit?: 'contain' | 'cover'
}

export const certifications: Certification[] = [
  {
    id: 'iso27001-la',
    logo: '/cert-logos/iso27001-la.png',
    name: 'ISO/IEC 27001:2022 Lead Auditor',
    shortName: 'ISO 27001 LA',
    issuer: 'PECB',
    issued: 'Feb 2026',
    description:
      'Qualified to plan and lead audits of information security management systems against ISO/IEC 27001:2022.',
  },
  {
    id: 'cisa',
    logo: '/cert-logos/cisa.png',
    name: 'Certified Information Systems Auditor',
    shortName: 'CISA',
    issuer: 'ISACA',
    reviewNote: 'Confirm status & date',
    description:
      'Globally recognised credential for IT audit, control and assurance professionals.',
  },
  {
    id: 'cysa-plus',
    logo: '/cert-logos/cysa-plus.png',
    name: 'CompTIA CySA+',
    shortName: 'CySA+',
    issuer: 'CompTIA',
    issued: 'Nov 2025',
    expires: 'Nov 2028',
    description: 'Behavioural analytics for threat detection, security operations and incident response.',
  },
  {
    id: 'security-plus',
    logo: '/cert-logos/security-plus.png',
    name: 'CompTIA Security+',
    shortName: 'Security+',
    issuer: 'CompTIA',
    issued: 'Sep 2025',
    expires: 'Sep 2028',
    description: 'Baseline certification for core security functions and best practices.',
  },
  {
    id: 'csap',
    logo: '/cert-logos/csap.png',
    name: 'CompTIA Security Analytics Professional',
    shortName: 'CSAP',
    issuer: 'CompTIA',
    issued: 'Nov 2025',
    description: 'Stackable certification recognising the combination of Security+ and CySA+.',
  },
  {
    id: 'a-plus',
    logo: '/cert-logos/a-plus.png',
    name: 'CompTIA A+',
    shortName: 'A+',
    issuer: 'CompTIA',
    issued: 'Sep 2025',
    expires: 'Sep 2028',
    description: 'Foundational IT infrastructure, networking and troubleshooting skills.',
  },
  {
    id: 'ceh',
    logo: '/cert-logos/ceh.png',
    logoFit: 'cover',
    name: 'Certified Ethical Hacker (CEH)',
    shortName: 'CEH',
    issuer: 'EC-Council',
    issued: 'Sep 2025',
    expires: 'Sep 2028',
    description: 'Ethical hacking methodology: reconnaissance, attack techniques and the defences that stop them.',
  },
]
