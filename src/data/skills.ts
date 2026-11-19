export interface SkillGroup {
  id: string
  title: string
  blurb: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'awareness-culture',
    title: 'Cybersecurity Awareness & Culture',
    blurb: 'Making secure behaviour the default way people work.',
    skills: [
      'Security awareness campaigns',
      'Security culture programmes',
      'Human risk management',
      'Employee behaviour & engagement',
      'Awareness metrics & effectiveness tracking',
      'Compliance & policy awareness',
    ],
  },
  {
    id: 'phishing-se',
    title: 'Phishing & Social Engineering',
    blurb: 'Showing people what an attack feels like before it is real.',
    skills: [
      'Phishing simulation management',
      'Social engineering awareness',
      'Live attack demonstrations',
      'Reporting-behaviour reinforcement',
    ],
  },
  {
    id: 'corporate-training',
    title: 'Corporate Security Training',
    blurb: 'Training design and delivery for mixed technical audiences.',
    skills: [
      'Workshop & curriculum design',
      'Live demonstrations & labs',
      'Assessments & progress tracking',
      'Mentoring & coaching',
      'Cross-cultural facilitation',
      'Mock audits & simulations',
    ],
  },
  {
    id: 'secops-siem',
    title: 'Security Operations & SIEM',
    blurb: 'Practical detection, analysis and response foundations.',
    skills: [
      'SOC operations',
      'Splunk',
      'IBM QRadar',
      'Incident response simulations',
      'Wireshark',
      'Nmap',
      'Nessus',
      'Burp Suite',
      'Metasploit',
    ],
  },
  {
    id: 'grc-fundamentals',
    title: 'GRC & Information Security Fundamentals',
    blurb: 'Governance, risk and audit practice behind the programmes.',
    skills: [
      'ISMS implementation',
      'Risk assessments',
      'Internal audits',
      'ITGC reviews',
      'Gap analysis & control testing',
      'Vendor risk management',
      'ServiceNow GRC',
      'RSA Archer',
      'OneTrust',
    ],
  },
  {
    id: 'frameworks',
    title: 'Security Frameworks & Compliance',
    blurb: 'Standards and regulations that shape security programmes.',
    skills: [
      'ISO/IEC 27001',
      'NIST CSF',
      'COBIT',
      'CIS Controls',
      'PCI-DSS',
      'SOX',
      'SOC 1 & SOC 2',
      'ITIL',
      'GDPR',
      'DPDP Act',
    ],
  },
]
