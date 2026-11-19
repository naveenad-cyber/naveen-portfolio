export interface TrainingProgram {
  id: string
  title: string
  institution: string
  audience: string
  duration: string
  learners: string
  topics: string[]
}

/** Programmes delivered — carried over from the original site's training data. */
export const trainingPrograms: TrainingProgram[] = [
  {
    id: 'niit',
    title: 'CompTIA & Audit Certification Programmes',
    institution: 'NIIT',
    audience: 'International students and IT professionals',
    duration: 'Jul 2025 – Oct 2026',
    learners: '100+',
    topics: ['CompTIA A+', 'Security+', 'CySA+', 'ISO 27001 LA', 'CISA'],
  },
  {
    id: 'imarticus',
    title: 'PG Diploma in Cybersecurity',
    institution: 'Imarticus Learning',
    audience: 'Working professionals and graduates',
    duration: 'Mar – Dec 2025 · weekends',
    learners: '60+',
    topics: ['Ethical Hacking', 'SOC & SIEM', 'Cloud Security', 'GRC'],
  },
  {
    id: 'intrnforte',
    title: 'Cybersecurity Fundamentals to Pro',
    institution: 'IntrnForte',
    audience: 'Students and career switchers',
    duration: 'Jun – Sep 2025',
    learners: '100+',
    topics: ['Fundamentals', 'Linux Hardening', 'VAPT Labs', 'Capstones'],
  },
  {
    id: 'grad-gurukul',
    title: 'Cybersecurity & Ethical Hacking Workshops',
    institution: 'Grad Gurukul',
    audience: 'Students and IT professionals',
    duration: 'Mar – Dec 2024',
    learners: '150+',
    topics: ['Ethical Hacking', 'Network Security', 'SOC Basics', 'Wireshark'],
  },
]
