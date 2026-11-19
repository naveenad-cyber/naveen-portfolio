export interface Experience {
  id: string
  company: string
  role: string
  location?: string
  period: string
  /** Set to a short note when a date still needs to be confirmed by Naveen. Renders a visible "to confirm" tag. */
  reviewNote?: string
  kind: 'Awareness & culture' | 'Consulting' | 'Training' | 'Course creation'
  summary?: string
  highlights: string[]
  tags: string[]
}

/**
 * CURRENT ROLE — NextGen Identity.
 * Started Nov 2026. Role-specific accomplishments were not supplied, so the focus areas
 * below come from the positioning you gave. Replace/extend them.
 */
export const currentRole: Experience = {
  id: 'nextgen-identity',
  company: 'NextGen Identity',
  role: 'Cybersecurity Awareness & Culture Lead',
  period: 'Nov 2026 – Present',
  kind: 'Awareness & culture',
  summary:
    'Leading security awareness and culture, helping people make safer decisions as part of everyday work rather than a once-a-year training exercise.',
  highlights: [
    'Corporate cybersecurity awareness and security culture programmes.',
    'Security awareness campaigns, phishing simulations and social engineering awareness.',
    'Employee security behaviour and engagement; human risk management.',
    'Training effectiveness and assessment tracking.',
  ],
  tags: ['Security Culture', 'Human Risk', 'Phishing Simulation', 'Awareness Campaigns'],
}

/** Previous roles — dates and details taken from the resume and the original site. */
export const previousRoles: Experience[] = [
  {
    id: 'niit',
    company: 'NIIT',
    role: 'Cyber Security Consultant & Trainer',
    location: 'Gurugram, India (Remote)',
    period: 'Jul 2025 – Oct 2026',
    kind: 'Training',
    highlights: [
      'Designed and delivered CompTIA A+, Security+, CySA+, ISO 27001 Lead Auditor and CISA courses for international students, with 90%+ pass rates.',
      'Ran hands-on workshops, mock audits and labs on ethical hacking, SOC operations, VAPT and ISMS implementation.',
      'Supported ISO/IEC 27001:2022 ISMS implementation: control reviews, risk assessments, audit preparation, documentation and compliance evidence.',
      'Facilitated cross-cultural learner groups, tracking progress and providing remediation support.',
    ],
    tags: ['CompTIA', 'ISO 27001', 'GRC', 'Mock Audits', 'SOC'],
  },
  {
    id: 'intrnforte',
    company: 'IntrnForte',
    role: 'Cyber Security Specialist & Course Creator',
    location: 'Bengaluru, India (Remote)',
    period: 'June 2025 – Sep 2025',
    kind: 'Course creation',
    highlights: [
      'Designed and published a structured cybersecurity course and certification programme on the IntrnForte platform.',
      'Mentored 100+ learners through hands-on labs and capstone projects.',
      'Guided learners on GitHub portfolio building and career transition into cybersecurity.',
    ],
    tags: ['Course Design', 'Labs', 'Mentoring'],
  },
  {
    id: 'imarticus',
    company: 'Imarticus Learning',
    role: 'Cyber Security Trainer',
    location: 'Bengaluru, India (Weekends)',
    period: 'March 2025 – Dec 2025',
    kind: 'Training',
    highlights: [
      'Delivered the PG Diploma in Cybersecurity: ethical hacking, SOC operations, cloud security, risk management and governance.',
      'Ran incident response simulations, mock audits and compliance gap-analysis exercises.',
      'Achieved 85%+ certification success rates across Security+, CySA+, ISO 27001 LA and CISA tracks.',
    ],
    tags: ['PG Diploma', 'Incident Response', 'GRC'],
  },
  {
    id: 'ga-software',
    company: 'GA Software Technologies Pvt. Ltd.',
    role: 'Associate Cyber Security Consultant',
    location: 'Bengaluru, India',
    period: 'Jan 2025 – Jun 2025',
    kind: 'Consulting',
    highlights: [
      'Managed phishing simulation campaigns and third-party vendor security assessments.',
      'Supported ISMS implementation through control gap analysis and remediation planning.',
      'Conducted VAPT across web applications and internal networks, mapped to ISO 27001 controls.',
    ],
    tags: ['Phishing Simulation', 'Vendor Risk', 'ISMS', 'VAPT'],
  },
  {
    id: 'grad-gurukul',
    company: 'Grad Gurukul',
    role: 'Cyber Security Trainer',
    location: 'Bengaluru, India',
    period: 'March 2024 – Dec 2024',
    kind: 'Training',
    highlights: [
      'Delivered cybersecurity training for students and working professionals: ethical hacking, network security, SOC fundamentals.',
      'Built hands-on lab environments and ran mock assessments and career mentoring.',
    ],
    tags: ['Ethical Hacking', 'Labs', 'Mentoring'],
  },
  {
    id: 'texial',
    company: 'Texial',
    role: 'Associate Cyber Security Consultant',
    location: 'Bengaluru, India',
    period: 'June 2023 – Dec 2024',
    kind: 'Consulting',
    highlights: [
      'Managed phishing simulation campaigns and contributed to organisation-wide security awareness initiatives.',
      'Supported ISMS projects through audit evidence collection, control reviews and remediation tracking.',
      'Conducted VAPT and vendor security reviews, mapping technical findings to business risk.',
    ],
    tags: ['Awareness', 'Phishing Simulation', 'ISO 27001', 'VAPT'],
  },
]
