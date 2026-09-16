import React from 'react';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { 
  Building2, 
  Landmark, 
  Stethoscope, 
  ShoppingBag, 
  Truck, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries We Serve | Mavora Technologies Ltd',
  description: 'Tailored enterprise software, AI automation, and cybersecurity solutions built for Fintech, Healthcare, Retail, Logistics, Public Sector, and Professional Services.',
};

const INDUSTRIES = [
  {
    id: 'financial-services',
    title: 'Financial Services & Fintech',
    icon: Landmark,
    badge: 'High Security & Concurrency',
    challenge: 'Strict regulatory compliance, fraud prevention, and the need for sub-second transactional latency across distributed networks.',
    solutions: [
      'Core banking & ledger middleware development',
      'Automated fraud detection using AI pattern matching',
      'PCI-DSS compliant payment gateway integrations',
      'Real-time financial analytics & audit trail reporting'
    ],
    impact: '99.99% uptime with enterprise zero-trust transaction architecture.'
  },
  {
    id: 'healthcare',
    title: 'Healthcare & MedTech',
    icon: Stethoscope,
    badge: 'HIPAA & Data Privacy',
    challenge: 'Siloed medical records, strict data privacy mandates, and inefficient patient-provider communication channels.',
    solutions: [
      'HIPAA/GDPR-compliant Electronic Health Record (EHR) portals',
      'Telemedicine & remote patient monitoring platforms',
      'Automated AI medical triage & document processing',
      'Interoperable HL7/FHIR API integration middleware'
    ],
    impact: 'Streamlined patient onboarding and encrypted medical data exchange.'
  },
  {
    id: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    icon: ShoppingBag,
    badge: 'Omnichannel & Scalability',
    challenge: 'Inventory fragmentation across branches, high cart abandonment, and delayed multi-channel stock sync.',
    solutions: [
      'Multi-tenant POS and central inventory management systems',
      'Custom head-less e-commerce web & mobile storefronts',
      'AI recommendation engines & automated customer messaging',
      'Integrated M-Pesa, card, and digital wallet payment stacks'
    ],
    impact: 'Eliminated stock sync discrepancies and boosted multi-channel sales retention.'
  },
  {
    id: 'logistics-supply-chain',
    title: 'Logistics & Supply Chain',
    icon: Truck,
    badge: 'Real-Time Visibility',
    challenge: 'Lack of real-time consignment visibility, manual manifest entry, and inefficient fleet dispatching.',
    solutions: [
      'IoT fleet tracking & real-time dispatch dashboards',
      'Automated warehouse inventory scanning & dispatch rules',
      'Mobile driver apps with offline-first sync capabilities',
      'Predictive delivery SLA estimation models'
    ],
    impact: 'Reduced operational turnaround time and manual data entry errors.'
  },
  {
    id: 'education-public-sector',
    title: 'Public Sector & Education',
    icon: GraduationCap,
    badge: 'Institutional Scale',
    challenge: 'Paper-heavy administrative workflows, legacy IT hardware, and insecure public portal access.',
    solutions: [
      'Institutional ERP systems for student & staff management',
      'Secure government agency service portals & e-filing',
      'Cloud modernization for high-concurrency public traffic',
      'Role-based access control (RBAC) & data encryption'
    ],
    impact: 'Modernized legacy paper processes into secure digital workflows.'
  },
  {
    id: 'professional-services',
    title: 'Real Estate & Professional Services',
    icon: Briefcase,
    badge: 'Workflow Automation',
    challenge: 'Manual client document collection, fragmented deal pipelines, and delayed reporting.',
    solutions: [
      'Custom CRM platforms tailored to complex service pipelines',
      'Property management portals with automated tenant billing',
      'Document automation & OCR extraction tools',
      'Client communication portals with embedded e-signatures'
    ],
    impact: 'Accelerated deal closing times and automated recurring administrative tasks.'
  }
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-mavora-light">
      {/* Hero Section */}
      <section className="bg-mavora-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1769FF_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="teal">Domain Expertise</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-4">
              Engineered Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-mavora-teal to-blue-400">Mission-Critical Industries.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Every sector operates under unique operational constraints and compliance mandates. We craft custom software, AI workflows, and cloud architectures tailored specifically to your industry context.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Detail Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Target Sectors"
            title="Sectors We Transform"
            subtitle="Explore how our deep domain understanding resolves core technical and operational bottlenecks."
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              return (
                <div 
                  key={ind.id} 
                  id={ind.id}
                  className="bg-mavora-light/60 border border-slate-200 rounded-2xl p-8 hover:border-mavora-blue/50 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-mavora-navy text-mavora-teal flex items-center justify-center shrink-0">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-mavora-navy">{ind.title}</h2>
                      </div>
                      <Badge variant="blue" className="hidden sm:inline-flex">{ind.badge}</Badge>
                    </div>

                    {/* Challenge Box */}
                    <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700">
                      <span className="font-bold text-amber-900 block mb-1">Industry Bottleneck:</span>
                      {ind.challenge}
                    </div>

                    {/* Solutions Offered */}
                    <div className="space-y-3 mb-6">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-mavora-navy">Tailored Engineering Solutions:</h3>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {ind.solutions.map((sol, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-mavora-teal shrink-0 mt-0.5" />
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-mavora-navy">
                    <span className="text-mavora-blue">{ind.impact}</span>
                    <Button href="/request-project" variant="ghost" size="sm" className="text-xs p-0 hover:bg-transparent text-mavora-navy hover:text-mavora-blue">
                      Start Industry Build <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-Industry Compliance & Security Standard */}
      <section className="py-20 bg-mavora-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="teal">Enterprise Compliance</Badge>
              <h2 className="text-3xl font-bold">Uncompromising Security & Regulatory Alignment</h2>
              <p className="text-slate-300 leading-relaxed text-sm">
                Regardless of your industry, data integrity and availability remain non-negotiable. Mavora Technologies bakes zero-trust architecture, automated backups, and encrypted transit pipelines directly into every custom deployment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <ShieldCheck className="h-6 w-6 text-mavora-teal mb-2" />
                  <h3 className="font-bold text-sm">Encrypted Storage</h3>
                  <p className="text-xs text-slate-400 mt-1">AES-256 at rest and TLS 1.3 in transit standards.</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <Building2 className="h-6 w-6 text-mavora-teal mb-2" />
                  <h3 className="font-bold text-sm">Strict Role RBAC</h3>
                  <p className="text-xs text-slate-400 mt-1">Granular user permission models and immutable access logs.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/80 p-8 rounded-2xl border border-slate-700 space-y-6 text-center">
              <h3 className="text-xl font-bold">Don't See Your Specific Sector?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Our core full-stack software, AI automation, and cloud engineering principles adapt seamlessly to complex domain requirements.
              </p>
              <Button href="/request-consultation" variant="secondary" size="lg" className="w-full">
                Schedule a Tech Architecture Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-mavora-navy">
            Ready to Build an Industry-Leading Platform?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Contact our engineering leads to review your industry's technical challenges and design an actionable solution roadmap.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Button href="/request-project" variant="primary" size="lg">
              Start a Project
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}