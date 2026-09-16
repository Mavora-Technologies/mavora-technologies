export interface ProjectItem {
  id: string;
  title: string;
  category: 'ai-automation' | 'software-development' | 'cybersecurity' | 'cloud-it' | 'mobile-development' | 'web-development';
  categoryLabel: string;
  clientIndustry: string;
  summary: string;
  challenge: string;
  solution: string;
  impactMetrics: string[];
  techStack: string[];
  featured: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'enterprise-ai-document-pipeline',
    title: 'Autonomous Document & Invoice Processing Engine',
    category: 'ai-automation',
    categoryLabel: 'AI & Automation',
    clientIndustry: 'Logistics & Supply Chain',
    summary: 'Automated high-volume invoice processing and unstructured document extraction using private LLMs and OCR pipelines.',
    challenge: 'Manual document entry required 120+ staff hours weekly, causing 14% invoice data mismatches and vendor payment delays.',
    solution: 'Engineered a secure document ingestion API using OCR and vector-based LLM parsing that extracts, verifies, and pushes data straight to the central ERP.',
    impactMetrics: [
      '88% reduction in manual processing time',
      '99.4% field extraction accuracy rate',
      '< 3 seconds average invoice turnaround time'
    ],
    techStack: ['TypeScript', 'Next.js', 'Python', 'FastAPI', 'OpenAI API', 'Neon PostgreSQL', 'Docker'],
    featured: true,
  },
  {
    id: 'multi-tenant-pos-erp-platform',
    title: 'Multi-Branch Inventory & POS Enterprise Platform',
    category: 'software-development',
    categoryLabel: 'Software Development',
    clientIndustry: 'Retail & E-commerce',
    summary: 'A unified cloud ERP platform synchronizing offline POS sales, real-time central stock, and M-Pesa automated payments.',
    challenge: 'Stock level discrepancies across 24 retail locations resulted in inventory shrinkage and delayed reordering.',
    solution: 'Built a modular monorepo ERP with offline-first POS capabilities, instant ledger syncing, and automated supplier purchase orders.',
    impactMetrics: [
      'Zero stock audit discrepancy across 24 stores',
      '42% improvement in stock turnover speed',
      'Automated M-Pesa payment reconciliation'
    ],
    techStack: ['Next.js App Router', 'Node.js', 'Drizzle ORM', 'Neon PostgreSQL', 'Tailwind CSS', 'Redis'],
    featured: true,
  },
  {
    id: 'zero-trust-fintech-security',
    title: 'Zero-Trust Security & RBAC Infrastructure Overhaul',
    category: 'cybersecurity',
    categoryLabel: 'Cybersecurity',
    clientIndustry: 'Financial Services',
    summary: 'Implemented zero-trust architecture, granular RBAC, and automated vulnerability scanning for a regional microfinance provider.',
    challenge: 'Legacy system access lacked role segregation and centralized logging, failing quarterly compliance audits.',
    solution: 'Designed an IAM service with multi-factor biometric authentication, encrypted data vaults, and 24/7 SIEM monitoring.',
    impactMetrics: [
      '100% audit compliance score achieved',
      'Zero unauthorized privilege escalations',
      'Sub-second incident anomaly detection'
    ],
    techStack: ['OAuth2 / OIDC', 'AWS GuardDuty', 'PostgreSQL', 'Docker', 'Vault', 'Tailscale'],
    featured: true,
  },
  {
    id: 'cloud-infrastructure-modernization',
    title: 'High-Availability Healthcare Cloud Migration',
    category: 'cloud-it',
    categoryLabel: 'Cloud & IT Solutions',
    clientIndustry: 'Healthcare & MedTech',
    summary: 'Migrated an on-premise hospital system to a serverless, HIPAA-compliant multi-region cloud deployment.',
    challenge: 'On-premise server outages during peak patient registration hours led to operational downtime and data risk.',
    solution: 'Architected a serverless container infrastructure on Cloudflare/Vercel and Neon PostgreSQL with automated multi-region replication.',
    impactMetrics: [
      '99.99% system availability post-migration',
      '65% reduction in monthly infrastructure costs',
      'Automated zero-downtime database backups'
    ],
    techStack: ['Cloudflare Edge', 'Neon PostgreSQL', 'Vercel', 'Next.js', 'Docker', 'GitHub Actions'],
    featured: false,
  },
  {
    id: 'field-agent-mobile-portal',
    title: 'Offline-First Field Data Collection & Dispatch App',
    category: 'mobile-development',
    categoryLabel: 'Mobile App Development',
    clientIndustry: 'Professional Services',
    summary: 'Cross-platform mobile application providing field engineers with offline job dispatching and secure data synchronization.',
    challenge: 'Field operatives in remote regions lost data connection, delaying service delivery logs by up to 48 hours.',
    solution: 'Developed an offline-first mobile app using local SQLite storage that auto-syncs with the central cloud database when connectivity resumes.',
    impactMetrics: [
      '100% field log data capture reliability',
      '3.5x faster job dispatch turnarounds',
      'Zero data loss during connection dropouts'
    ],
    techStack: ['React Native', 'SQLite', 'TypeScript', 'Node.js API', 'Tailwind CSS'],
    featured: false,
  },
];