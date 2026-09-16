export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  iconName: string;
  problemStatement: string;
  whatWeProvide: string;
  keyCapabilities: string[];
  techApproach: string;
  benefits: string[];
  useCases: string[];
  faqs: FAQItem[];
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  'ai-automation': {
    slug: 'ai-automation',
    title: 'AI & Automation',
    tagline: 'Streamline operational workflows with enterprise-grade artificial intelligence.',
    shortDesc: 'AI business tools, workflow automation, intelligent chatbots, document processing, and predictive analytics.',
    iconName: 'Bot',
    problemStatement: 'Manual data processing, repetitive administrative tasks, and delayed client responses consume valuable engineering and operational hours, increasing human error and capping growth.',
    whatWeProvide: 'Custom AI business tools and intelligent workflow automation platforms designed to eliminate operational friction and automate high-volume decision pipelines.',
    keyCapabilities: [
      'AI business tools & custom LLM integrations',
      'Workflow automation & RPA',
      'Intelligent chatbots & virtual AI assistants',
      'Document automation & OCR extraction',
      'AI-powered reporting & predictive analytics',
      'Automated lead scoring & CRM enrichment',
      'Business intelligence predictive modeling'
    ],
    techApproach: 'We integrate secure vector databases, modern LLM APIs (OpenAI, Anthropic), and serverless orchestration pipelines with strict data privacy protocols.',
    benefits: [
      'Reduce manual task completion time by up to 80%',
      'Deliver 24/7 automated customer support response',
      'Unlock predictive business intelligence from unstructured data',
      'Lower operational overhead while scaling output'
    ],
    useCases: [
      'Automated customer support resolution using custom AI agents',
      'Automated invoice ingestion and approval routing',
      'Predictive sales forecasting and lead scoring',
      'Automated document summary and contract parsing'
    ],
    faqs: [
      {
        question: 'Is our corporate data safe when using your AI tools?',
        answer: 'Yes. We build self-hosted or private enterprise AI connections that never expose your proprietary data to public model training sets.'
      },
      {
        question: 'Can AI automation integrate with our legacy software?',
        answer: 'Absoluted. We design custom API bridges and middleware to connect modern AI engines to existing legacy systems.'
      }
    ]
  },
  'software-development': {
    slug: 'software-development',
    title: 'Software Development',
    tagline: 'Tailor-made enterprise applications built for scale and reliability.',
    shortDesc: 'Custom enterprise software, ERP, CRM, POS, HRM systems, robust APIs, and SaaS platforms.',
    iconName: 'Code',
    problemStatement: 'Off-the-shelf software often fails to align with unique business processes, forcing companies into rigid workflows that hinder efficiency.',
    whatWeProvide: 'End-to-end custom software design and engineering—from core enterprise business platforms to cloud-native SaaS applications.',
    keyCapabilities: [
      'Custom business management systems',
      'Enterprise Resource Planning (ERP)',
      'Customer Relationship Management (CRM)',
      'Point of Sale (POS) & inventory platforms',
      'Human Resource Management (HRM)',
      'High-throughput REST & GraphQL APIs',
      'Multi-tenant SaaS platform development'
    ],
    techApproach: 'Clean architecture in Node.js, Next.js, and PostgreSQL using domain-driven design, TypeScript, and automated CI/CD pipelines.',
    benefits: [
      'Software tailored 100% to your unique business logic',
      'Zero recurring per-user licensing fees for proprietary platforms',
      'Modular architecture ready for seamless ERP expansion',
      'Complete ownership of intellectual property and codebases'
    ],
    useCases: [
      'Multi-branch inventory and POS management',
      'Custom internal CRM with automated pipeline management',
      'Enterprise portal for cross-department project tracking',
      'Subscription-based SaaS product launching'
    ],
    faqs: [
      {
        question: 'Do we own the source code after development?',
        answer: 'Yes. Upon project completion, full intellectual property rights and code repositories are transferred to your organization.'
      },
      {
        question: 'How do you handle feature updates after launch?',
        answer: 'We provide ongoing maintenance level agreements (SLAs) and agile development sprints for continuous feature enhancements.'
      }
    ]
  },
  'web-development': {
    slug: 'web-development',
    title: 'Web Development',
    tagline: 'High-performance, accessible, and high-converting web experiences.',
    shortDesc: 'Custom Next.js web applications, corporate portals, and SEO-optimized digital platforms.',
    iconName: 'Globe',
    problemStatement: 'Slow, unoptimized, and non-responsive websites damage brand credibility, lose potential leads, and perform poorly on search engines.',
    whatWeProvide: 'Modern web development built on Next.js, React, and serverless edge delivery—optimized for extreme speed, search visibility, and conversion.',
    keyCapabilities: [
      'Custom web application development',
      'Corporate websites & client portals',
      'Server-side rendering (SSR) & static generation',
      'Technical SEO & Web Vitals optimization',
      'Progressive Web Applications (PWAs)',
      'Headless CMS integration'
    ],
    techApproach: 'Next.js App Router, TypeScript, Tailwind CSS, deployed on Cloudflare/Vercel edge networks for sub-second load times.',
    benefits: [
      'Lighthouse performance scores consistently above 90+',
      'Superior search engine ranking via server-rendered metadata',
      'Responsive design across all mobile and desktop screen sizes',
      'Robust security with strict Content Security Policies (CSP)'
    ],
    useCases: [
      'Corporate portal for B2B client onboarding',
      'High-traffic digital media and publishing platforms',
      'Interactive customer portal with real-time analytics dashboards'
    ],
    faqs: [
      {
        question: 'How long does a custom web project take?',
        answer: 'Typical web applications range from 4 to 8 weeks depending on integration requirements and scope.'
      }
    ]
  },
  'mobile-development': {
    slug: 'mobile-development',
    title: 'Mobile App Development',
    tagline: 'Seamless native and cross-platform mobile experiences for iOS and Android.',
    shortDesc: 'Native and cross-platform mobile applications engineered for security, speed, and offline reliability.',
    iconName: 'Smartphone',
    problemStatement: 'Businesses struggle to engage mobile-first users without responsive, secure, and intuitive mobile applications.',
    whatWeProvide: 'Production-ready iOS and Android applications with offline-first synchronization, secure biometric access, and clean UI/UX.',
    keyCapabilities: [
      'Cross-platform iOS & Android development',
      'Native mobile applications',
      'Offline-first data synchronization',
      'Biometric authentication & local encryption',
      'Real-time push notifications',
      'App Store & Play Store deployment management'
    ],
    techApproach: 'React Native and Flutter with native device bridge integration and secure API communication backends.',
    benefits: [
      'Single codebase deployment for faster time-to-market',
      'Smooth 60 FPS user interface performance',
      'Full offline capability for field operations'
    ],
    useCases: [
      'Field agent data collection and offline reporting app',
      'Customer loyalty and mobile payment portal',
      'On-demand logistics tracking mobile application'
    ],
    faqs: [
      {
        question: 'Do you publish the apps to Google Play and Apple App Store?',
        answer: 'Yes. We handle the complete submission, compliance, and publishing process for both platforms.'
      }
    ]
  },
  'cybersecurity': {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    tagline: 'Proactive threat defense and enterprise-grade security architectures.',
    shortDesc: 'Security assessments, network protection, vulnerability scanning, threat monitoring, and zero-trust design.',
    iconName: 'ShieldAlert',
    problemStatement: 'Evolving cyber threats, ransomware, and data leaks put organizational reputation, legal compliance, and continuity at extreme risk.',
    whatWeProvide: 'Comprehensive security audits, vulnerability management, zero-trust network design, and employee threat awareness training.',
    keyCapabilities: [
      'Vulnerability assessments & penetration testing',
      'Zero-Trust network architecture',
      'Data encryption (at rest & in transit)',
      'Access control (RBAC & IAM management)',
      '24/7 security monitoring & incident response',
      'Cybersecurity awareness training programs',
      'Compliance auditing (ISO 27001 / GDPR)'
    ],
    techApproach: 'Layered defense strategy using automated vulnerability scanners, threat detection logging, and strict cryptographic standards.',
    benefits: [
      'Identify and remediate security vulnerabilities before exploitation',
      'Safeguard sensitive client and enterprise data from breaches',
      'Maintain compliance with global regulatory data standards',
      'Ensure uninterrupted business continuity'
    ],
    useCases: [
      'Banking & fintech infrastructure security audit',
      'Implementation of Role-Based Access Control (RBAC) across corporate apps',
      'Healthcare patient data encryption compliance verification'
    ],
    faqs: [
      {
        question: 'How often should our company perform a security audit?',
        answer: 'We recommend comprehensive security assessments at least annually, or whenever major software infrastructure changes occur.'
      }
    ]
  },
  'cloud-it': {
    slug: 'cloud-it',
    title: 'Cloud & IT Solutions',
    tagline: 'Resilient cloud infrastructure and modern IT deployment services.',
    shortDesc: 'Cloud migration, infrastructure management, automated backups, network architecture, and technical support.',
    iconName: 'Cloud',
    problemStatement: 'Legacy on-premise hardware causes frequent downtime, high maintenance costs, and limits operational scalability.',
    whatWeProvide: 'End-to-end cloud infrastructure engineering, serverless deployment pipelines, automated disaster recovery, and corporate IT support.',
    keyCapabilities: [
      'Cloud migration & deployment (AWS, GCP, Vercel, Cloudflare)',
      'Serverless & containerized architecture (Docker)',
      'Automated database backups & disaster recovery',
      'Network setup & infrastructure management',
      'Managed IT support services',
      'Digital infrastructure health monitoring'
    ],
    techApproach: 'Infrastructure as Code (IaC) with automated provisioning, zero-downtime deployment pipelines, and global CDN edge routing.',
    benefits: [
      'Eliminate expensive physical server maintenance',
      'Scale computing resources dynamically based on user demand',
      'Ensure 99.99% uptime with automated failover policies'
    ],
    useCases: [
      'Migrating legacy on-premise servers to Neon PostgreSQL and Vercel',
      'Setting up multi-region disaster recovery for enterprise data',
      'Configuring secure remote worker VPNs and cloud networks'
    ],
    faqs: [
      {
        question: 'Can you migrate our existing databases without downtime?',
        answer: 'Yes. We utilize real-time replication strategies to execute database migrations with minimal to zero disruption to live operations.'
      }
    ]
  },
  'data-analytics': {
    slug: 'data-analytics',
    title: 'Data Analytics',
    tagline: 'Transform raw data into actionable business intelligence.',
    shortDesc: 'Business intelligence dashboards, KPI tracking, automated reporting, data visualization, and predictive modeling.',
    iconName: 'BarChart3',
    problemStatement: 'Siloed organizational data leaves decision-makers relying on intuition rather than clear, real-time insights.',
    whatWeProvide: 'Centralized data warehousing, real-time executive dashboards, key performance indicator (KPI) tracking, and predictive visual analytics.',
    keyCapabilities: [
      'Business Intelligence (BI) dashboards',
      'Real-time automated executive reporting',
      'Interactive data visualization tools',
      'KPI tracking & anomaly detection',
      'Predictive analytics & forecasting models',
      'ETL (Extract, Transform, Load) data pipelines'
    ],
    techApproach: 'Modern data stack pipelines connecting PostgreSQL/BigQuery into interactive visualization dashboards like PowerBI, Metabase, or custom web UI dashboards.',
    benefits: [
      'Make data-driven executive decisions with confidence',
      'Uncover hidden operational efficiencies and revenue leaks',
      'Automate weekly and monthly report generation'
    ],
    useCases: [
      'Real-time retail sales and stock analytics dashboard',
      'Automated financial performance reports for board members',
      'Customer retention and churn prediction modeling'
    ],
    faqs: [
      {
        question: 'Can we aggregate data from multiple different tools into one dashboard?',
        answer: 'Yes. We build unified ETL pipelines that pull data from CRMs, ERPs, web analytics, and accounting software into a single unified dashboard.'
      }
    ]
  },
  'digital-transformation': {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    tagline: 'Strategic technological guidance to modernize business models.',
    shortDesc: 'Consulting, legacy system modernization, tech stack advisory, and digital workflow re-engineering.',
    iconName: 'RefreshCw',
    problemStatement: 'Outdated legacy processes restrict business speed, increase labor costs, and prevent companies from competing with modern digital-first competitors.',
    whatWeProvide: 'Executive-level technology strategy, digital audits, legacy modernization roadmaps, and hands-on change management.',
    keyCapabilities: [
      'Legacy system audit & modernization roadmaps',
      'Technology stack advisory & architectural design',
      'Digital workflow re-engineering',
      'Change management & team technical enablement',
      'Enterprise software integration strategy'
    ],
    techApproach: 'Comprehensive operational audits followed by phased, non-disruptive technology integration roadmaps.',
    benefits: [
      'Future-proof business operations against digital disruption',
      'Optimize technology expenditure with modern stack choices',
      'Accelerate time-to-market for new products and services'
    ],
    useCases: [
      'Modernizing paper-based government or institutional workflows',
      'Replacing legacy monolithic software with modern cloud services',
      'Drafting 3-year digital enterprise technology roadmaps'
    ],
    faqs: [
      {
        question: 'How do you ensure employees adapt to new technology?',
        answer: 'We incorporate structured training, comprehensive documentation, and intuitive UI design directly into our transformation strategy.'
      }
    ]
  }
};