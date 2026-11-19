export interface Testimonial {
  id: string
  quote: string
  name?: string
  designation?: string
  organisation?: string
  /** e.g. "Learner feedback, Security+ cohort" */
  context?: string
  /** True when only the opening part of a longer recommendation is shown. */
  excerpt?: boolean
}

/**
 * REAL FEEDBACK LIVES HERE — word for word, do not paraphrase.
 * Feedback screenshots go in /public/feedback (they appear automatically, no code needed).
 *
 * Example:
 * {
 *   id: 'learner-1',
 *   quote: 'Exact words from the learner…',
 *   name: 'Full Name',
 *   designation: 'Role / student',
 *   organisation: 'Company or institution',
 *   context: 'Security+ cohort',
 * },
 */
export const testimonials: Testimonial[] = [
  {
    id: 'fabian-holl',
    quote:
      'I had the pleasure of completing my CySA+ and Security+ training with Naveen, and I can highly recommend him as a trainer. He has a strong technical understanding and does an excellent job of explaining complex cybersecurity topics in a clear and practical way. Throughout the training, he provided valuable insights and effective strategies for approaching the certification exams.',
    name: 'Fabian Höll',
    designation: 'Systemadministrator | IT Infrastructure & Security',
    context: 'LinkedIn recommendation · Apr 2026',
    excerpt: true,
  },
  {
    id: 'kerstin-muller',
    quote:
      'I had the chance to learn from Naveen and exchange ideas with him in the cybersecurity space, and I can highly recommend him. He has a great ability to explain complex topics in a clear and structured way and is always approachable and supportive. Naveen combines solid technical knowledge with a genuine interest in helping others grow. I particularly appreciate his positive attitude and the way he shares his knowledge openly. I’m confident he will bring great value to any cybersecurity environment.',
    name: 'Kerstin Müller',
    designation: 'IT Delivery & Operations | Solution Architecture | Cybersecurity & IT Governance',
    context: 'LinkedIn recommendation · Apr 2026',
  },
  {
    id: 'edgar-quezada',
    quote:
      'Naveen was one of my instructors who was instrumental in my achieving the necessary certifications to become a Cybersecurity Specialist. As my colleagues and I were able to exchange ideas with him in the cybersecurity space, he proved to be instrumental in our success as we progressed towards the goal in achieving international certifications. He demonstrated again and again his ability to explain complex topics in a clear and structured way and is always approachable and supportive.',
    name: 'Edgar Quezada',
    designation: 'Customer Success & Customer Service',
    organisation: 'CHL Group',
    context: 'LinkedIn recommendation · Apr 2026',
    excerpt: true,
  },
  {
    id: 'akomoneh-anumaneh',
    quote:
      'I was successfully coached by Naveen A D during the Cyber Security Bootcamp at neue fische and witnessed him play the important role of grooming a heterogeneous group of learners into confident, job-ready cybersecurity professionals. From the beginning, he stood out for his ability to connect theory and real-world practice: every concept in networking, SOC operations, ethical hacking, VAPT, cloud security, or GRC went straight down to hands-on labs, real incidents, and industry standards like MITRE ATT&CK, NIST, and ISO 27001.',
    name: 'Akomoneh Raymond Anumaneh',
    designation: 'DevOps & IT Infrastructure Engineer | Cybersecurity | Cloud Security',
    context: 'LinkedIn recommendation · Dec 2025',
    excerpt: true,
  },
  {
    id: 'murtuza-hussain',
    quote:
      'I would like to wholeheartedly recommend Naveen A D as an exceptional mentor in the field of cybersecurity and ethical hacking. Under his guidance, I have gained practical knowledge, hands-on skills, and a deeper understanding of cybersecurity concepts that go beyond theoretical learning. Naveen’s teaching style is patient, clear, and highly engaging. He breaks down complex topics into manageable, understandable parts, making learning both effective and enjoyable.',
    name: 'Mohammad Murtuza Hussain',
    designation: 'SOC Analyst L1 at Quadgen',
    context: 'LinkedIn recommendation · Oct 2025',
    excerpt: true,
  },
]
