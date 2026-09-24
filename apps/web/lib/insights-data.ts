export interface Author {
  name: string;
  role: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: Author;
  featured: boolean;
}

export const INSIGHTS_DATA: Record<string, Article> = {
  'architecting-enterprise-ai-automation': {
    slug: 'architecting-enterprise-ai-automation',
    title: 'Architecting Enterprise AI Automation: Beyond Simple Chatbots',
    excerpt: 'How modern businesses embed LLM pipelines and autonomous workflow triggers into existing ERP and CRM core systems.',
    content: `
      <p>Enterprise AI automation has evolved far beyond standard conversational chatbots. Modern organizations are deploying autonomous agentic workflows that integrate directly with core Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM) platforms.</p>
      <h2>The Shift to Agentic Workflows</h2>
      <p>Traditional automation relied on rigid, deterministic IF-THEN rules. By incorporating Large Language Models (LLMs) with retrieval-augmented generation (RAG) and tool-calling capabilities, systems can now reason through unstructured inputs, parse invoices, reconcile discrepancies, and initiate transactions securely.</p>
    `,
    category: 'AI & Automation',
    readTime: '6 min read',
    publishedAt: 'September 12, 2026',
    author: {
      name: 'Mavora Engineering Team',
      role: 'Principal AI Architects',
    },
    featured: true,
  },
  'zero-trust-api-architecture': {
    slug: 'zero-trust-api-architecture',
    title: 'Zero-Trust API Architecture: Securing Enterprise Monorepos',
    excerpt: 'Implementing strict Role-Based Access Control (RBAC), OAuth2 scope validations, and encrypted transit channels for modern web backends.',
    content: `
      <p>In distributed enterprise systems and monorepos, perimeter defense is no longer sufficient. Adopting a zero-trust model ensures that every service-to-service and client-to-service request is authenticated, authorized, and encrypted.</p>
    `,
    category: 'Cybersecurity',
    readTime: '8 min read',
    publishedAt: 'August 28, 2026',
    author: {
      name: 'Security Engineering Team',
      role: 'Cybersecurity Leads',
    },
    featured: true,
  },
  'scaling-nextjs-turbopack': {
    slug: 'scaling-nextjs-turbopack',
    title: 'Scaling Next.js & Turbopack for High-Throughput Corporate Portals',
    excerpt: 'Lessons learned from deploying high-availability Next.js App Router applications with Neon PostgreSQL and edge caching.',
    content: `
      <p>Building high-throughput corporate portals requires optimizing build pipelines and database connection pooling. With Next.js 16 and Turbopack, local compilation speeds scale linearly even across massive enterprise monorepos.</p>
    `,
    category: 'Software Engineering',
    readTime: '5 min read',
    publishedAt: 'August 14, 2026',
    author: {
      name: 'Mavora Web Team',
      role: 'Senior Frontend Architects',
    },
    featured: false,
  },
  'modern-database-architecture': {
    slug: 'modern-database-architecture',
    title: 'Modern Database Architecture: Serverless Postgres & Drizzle ORM',
    excerpt: 'Why enterprise developers are moving away from heavy ORMs and monolithic database instances toward serverless branching Postgres.',
    content: `
      <p>Traditional database provisioning introduces deployment bottlenecks and high idle costs. Serverless Postgres combined with lightweight, type-safe query builders like Drizzle ORM provides unprecedented developer velocity.</p>
    `,
    category: 'Cloud & Architecture',
    readTime: '7 min read',
    publishedAt: 'July 30, 2026',
    author: {
      name: 'Cloud Infrastructure Team',
      role: 'Database Reliability Engineers',
    },
    featured: false,
  },
};