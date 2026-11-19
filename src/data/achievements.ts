export interface Achievement {
  id: string
  /** Big number/figure shown on the tile */
  figure: string
  title: string
  description: string
  size: 'lg' | 'md' | 'wide'
}

export const achievements: Achievement[] = [
  {
    id: 'hours',
    figure: '720+',
    title: 'Hours of training delivered',
    description:
      'Cybersecurity training for technical and non-technical learners, from live demonstrations to certification bootcamps.',
    size: 'lg',
  },
  {
    id: 'learners',
    figure: '400+',
    title: 'Learners trained',
    description: 'Across classrooms, corporate sessions and online cohorts.',
    size: 'lg',
  },
  {
    id: 'international',
    figure: 'India · Europe',
    title: 'International exposure',
    description: 'Training delivered to learners across India and Europe.',
    size: 'md',
  },
  {
    id: 'pass-rate',
    figure: '85–90%+',
    title: 'Certification success rates',
    description: 'Reported across Security+, CySA+, ISO 27001 LA and CISA batches.',
    size: 'md',
  },
  {
    id: 'mentoring',
    figure: '200+',
    title: 'Mentoring sessions',
    description: 'Students and freshers guided on fundamentals and career pathways.',
    size: 'md',
  },
  {
    id: 'csap',
    figure: 'CSAP',
    title: 'CompTIA Security Analytics Professional',
    description: 'Stackable recognition from CompTIA for Security+ and CySA+.',
    size: 'md',
  },
  {
    id: 'publication',
    figure: 'IJARESM',
    title: 'Published research',
    description: '“AI Against Adversaries: Deep Learning’s Role in Malware Detection Using Autoencoders”, May 2024.',
    size: 'wide',
  },
  {
    id: 'community',
    figure: 'Kannada',
    title: 'CyberTechInKannada',
    description: 'Instagram community making cybersecurity careers accessible to students across Karnataka.',
    size: 'wide',
  },
]
