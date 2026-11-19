export interface Metric {
  value?: number
  suffix?: string
  text?: string
  label: string
}

export const profile = {
  name: 'Naveen A D',
  alternateName: 'Naveen AD',
  designation: 'Cybersecurity Awareness & Culture Lead',
  /** Full professional title used in the page footer, meta data and structured data. */
  jobTitle: 'Cybersecurity Awareness & Culture Lead | Cybersecurity Consultant & Trainer',
  company: 'NextGen Identity',
  positioning: [
    'Cybersecurity Awareness',
    'Security Culture',
    'Human Risk Management',
    'Security Training',
    'Cybersecurity Consulting',
  ],
  statement:
    'I help organizations build stronger security cultures by turning cybersecurity awareness into everyday employee behaviour.',
  location: 'Bengaluru, India',
  email: 'naveenadsince2k2@gmail.com',
  phone: '+91-9606258657',
  linkedin: 'https://www.linkedin.com/in/naveenad-cybersecurity',
  github: 'https://github.com/nzelyn',
  /** Add your channel URL (e.g. https://www.youtube.com/@yourhandle). It is added to the structured data only when filled in. */
  youtube: '',
  credly: 'https://credly.com/users/naveen-ad',
  medium: 'https://medium.com/@navigtechofficial',
  instagram: 'https://instagram.com/cybertechinkannada',
  whatsapp: 'https://wa.me/919606258657',
  resume: '/resume.pdf',
  photo: '/naveen-photo-green.png',
  // Formspree endpoint carried over from the original site.
  formEndpoint: 'https://formspree.io/f/meewgzpk',
  education: {
    degree: 'B.E. in Information Science',
    institution: 'Raja Rajeswari College of Engineering',
  },
  metrics: [
    { value: 720, suffix: '+', label: 'Hours of cybersecurity training delivered' },
    { value: 400, suffix: '+', label: 'Learners trained' },
    { text: 'India · Europe', label: 'Technical and non-technical audiences' },
  ] as Metric[],
}

export type Profile = typeof profile
