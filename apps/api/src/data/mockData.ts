export interface ProjectItem {
  id: string;
  title: string;
  category: 'ai-automation' | 'software-development' | 'cybersecurity' | 'cloud-it' | 'mobile-development';
  categoryLabel: string;
  clientIndustry: string;
  summary: string;
  challenge: string;
  solution: string;
  techStack: string[];
  impactMetrics: string[];
}

export interface InsightItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  imageUrl: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Enterprise AI Legal Document Processing Platform',
    category: 'ai-automation',
    categoryLabel: 'AI & Automation',
    clientIndustry: 'Legal & Financial Services',
    summary: 'Automated contract review and compliance analysis using custom LLM agents and OCR pipelines.',
    challenge: 'Manual compliance audits required over 40 hours per corporate filing batch, causing significant bottlenecks.',
    solution: 'Engineered a RAG-powered document parsing pipeline with automated risk scoring and custom extraction agents.',
    techStack: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'React', 'Tailwind CSS'],
    impactMetrics: [
      '85% reduction in contract audit cycle time',
      '99.2% accuracy on clause extraction',
      'KSh 4.2M saved in annual operational overhead',
    ],
  },
  {
    id: 'proj-[#2]',
    title: 'Multi-Tenant Fintech Mobile App & Core Engine',
    category: 'mobile-development',
    categoryLabel: 'Mobile Apps',
    clientIndustry: 'Banking & SACCOs',
    summary: 'Scalable mobile banking platform integrating M-Pesa, core banking APIs, and fraud detection.',
    challenge: 'Legacy USSD-only infrastructure prevented young demographic adoption and lacked real-time transaction reporting.',
    solution: 'Built a cross-platform Flutter application backed by microservices architecture with bank-grade encryption.',
    techStack: ['Flutter', 'Node.js', 'Express', 'Redis', 'Docker', 'M-Pesa Daraja API'],
    impactMetrics: [
      '150,000+ active monthly app users',
      '< 200ms API response time across transaction endpoints',
      'Zero security breaches since launch',
    ],
  },
];

export const INSIGHTS_DATA: InsightItem[] = [
  {
    id: 'ins-1',
    slug: 'ai-automation-trends-kenya-2026',
    title: 'Navigating AI Automation in East Africa: 2026 Architectural Trends',
    excerpt: 'How enterprise tech leads are deploying local RAG architectures and edge AI models to balance cloud costs and data privacy.',
    content: `
      ### The Shift Toward Localized AI Architectures
      As organizations across Kenya and East Africa scale AI initiatives, data sovereignty and cloud egress costs have become key strategic constraints. 

      #### Key Takeaways:
      1. **Hybrid Retrieval-Augmented Generation (RAG):** Localizing vector databases while relying on fine-tuned open-source models reduces latency and infrastructure costs.
      2. **API Gateways for AI Compliance:** Implementing central audit layers for model prompts and completions to adhere to Kenya Data Protection Act regulations.
    `,
    category: 'AI & Automation',
    publishedAt: '2026-02-14',
    readTime: '6 min read',
    author: {
      name: 'Mavora Engineering Team',
      role: 'Enterprise AI Practice',
    },
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ins-2',
    slug: 'securing-cloud-microservices-guide',
    title: 'Zero Trust Architecture for Fintech Microservices',
    excerpt: 'A practical framework for implementing mTLS, JWT rotation, and network policies in containerized Kubernetes environments.',
    content: `
      ### Securing Distributed Payment Gateways
      Modern fintech architectures demand defense-in-depth across every microservice hop rather than relying purely on perimeter firewalls.

      #### Core Principles:
      * **Mutual TLS (mTLS):** Enforce strict service-to-service identity using Istio or Linkerd.
      * **Ephemeral Credentials:** Limit access token lifetimes to short intervals with refresh token rotation.
    `,
    category: 'Cybersecurity',
    publishedAt: '2026-01-28',
    readTime: '8 min read',
    author: {
      name: 'Mavora Security Practice',
      role: 'Cybersecurity & Infrastructure',
    },
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  },
];