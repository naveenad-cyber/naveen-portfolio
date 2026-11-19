export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  year: string
}

/** Technical foundations — carried over from the original portfolio. */
export const projects: Project[] = [
  {
    id: 'gpt-vuln-analyzer',
    title: 'GPT-Vuln-Analyzer',
    description:
      'AI-assisted vulnerability analysis integrating Llama2, GPT-3 and Google PaLM for threat detection and risk prioritisation.',
    tags: ['Python', 'LLM', 'DNS Recon'],
    year: '2024',
  },
  {
    id: 'startup-sbom',
    title: 'Startup-SBOM',
    description:
      'Reverse-engineered the Linux boot process to surface startup entries and package capabilities for supply-chain risk visibility.',
    tags: ['Python', 'Linux', 'SBOM'],
    year: '2024',
  },
  {
    id: 'quadra-inspect',
    title: 'QuadraInspect',
    description:
      'Android security analysis framework combining multiple tools for vulnerability detection and structured reporting.',
    tags: ['Python', 'Android', 'VAPT'],
    year: '2023',
  },
  {
    id: 'brute-hacking-framework',
    title: 'Brute-Hacking-Framework',
    description: 'Portable penetration-testing environment re-architected for Windows compatibility and upgradability.',
    tags: ['Python', 'Batch', 'Pen Testing'],
    year: '2023',
  },
  {
    id: 'isms-tracker',
    title: 'ISO 27001 ISMS Audit Tracker',
    description:
      'Workbook covering Annex A controls for ISO/IEC 27001:2022 with compliance status, risk register and audit findings.',
    tags: ['ISO 27001', 'GRC', 'Excel'],
    year: '2025',
  },
  {
    id: 'nexacloud-grc',
    title: 'NexaCloud GRC Portfolio',
    description:
      'Showcase GRC portfolio for a fictional company: policies, risk assessments, SOC 2 gap analysis and vendor risk framework.',
    tags: ['GRC', 'NIST CSF', 'SOC 2'],
    year: '2025',
  },
]
