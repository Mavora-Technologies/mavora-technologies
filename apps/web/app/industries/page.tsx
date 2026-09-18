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
  CheckCircle2,
  Code2,
  Cpu,
  Server
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
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
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
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-x-hidden">
      
      {/* Hero Section - Reduced top spacing & Edge-to-Edge with Analytics Unsplash Image */}
      <section className="relative bg-[#EBF3FF] text-slate-900 py-10 sm:py-14 lg:py-20 overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
                Domain Expertise
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
                Engineered Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">Mission-Critical Industries.</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                Every sector operates under unique operational constraints and compliance mandates. We craft custom software, AI workflows, and cloud architectures tailored specifically to your industry context.
              </p>
            </div>

            {/* Hero Right-Side Tech Dashboard Unsplash Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
                  alt="Enterprise analytics and software engineering dashboards" 
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wide bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
                    <Cpu className="w-4 h-4 text-teal-400" />
                    <span>Real-Time Processing</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300">
                    Enterprise Grade
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Industries Detail Grid with Integrated Unsplash Sector Images */}
      <section className="py-12 lg:py-20 relative bg-white/40 border-b border-slate-200/80">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10">
          <SectionHeading
            badge="Target Sectors"
            title="Sectors We Transform"
            subtitle="Explore how our deep domain understanding resolves core technical and operational bottlenecks."
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-10 lg:mt-12">
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              return (
                <div 
                  key={ind.id} 
                  id={ind.id}
                  className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col justify-between group"
                >
                  <div>
                    {/* Sector Header Image Banner */}
                    <div className="relative h-44 w-full overflow-hidden border-b border-slate-200/80">
                      <img 
                        src={ind.image} 
                        alt={ind.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-900/80 backdrop-blur-md border border-slate-700 text-teal-300 shadow-md">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> {ind.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">{ind.title}</h2>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6">
                      {/* Challenge Box */}
                      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-slate-700 shadow-sm">
                        <span className="font-bold text-amber-900 block mb-1">Industry Bottleneck:</span>
                        {ind.challenge}
                      </div>

                      {/* Solutions Offered */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">Tailored Engineering Solutions:</h3>
                        <ul className="space-y-3 text-xs text-slate-600">
                          {ind.solutions.map((sol, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{sol}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div className="px-6 sm:px-8 py-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold text-slate-900 bg-slate-50/50">
                    <span className="text-blue-600 leading-relaxed pr-4">{ind.impact}</span>
                    <Button 
                      href="/request-project" 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs p-0 hover:bg-transparent text-slate-600 hover:text-blue-700 shrink-0 self-start sm:self-center"
                    >
                      Start Industry Build <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-Industry Compliance & Security Standard (Dark Section with Cloud Unsplash Image) */}
      <section className="py-14 lg:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-400/10 border border-teal-400/20 text-teal-400 shadow-sm backdrop-blur-md mb-2">
                Enterprise Compliance
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Uncompromising Security & Regulatory Alignment</h2>
              <p className="text-slate-300 leading-relaxed text-sm">
                Regardless of your industry, data integrity and availability remain non-negotiable. Mavora Technologies bakes zero-trust architecture, automated backups, and encrypted transit pipelines directly into every custom deployment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md shadow-sm">
                  <ShieldCheck className="h-6 w-6 text-teal-400 mb-3" />
                  <h3 className="font-bold text-sm text-white">Encrypted Storage</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">AES-256 at rest and TLS 1.3 in transit standards.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md shadow-sm">
                  <Building2 className="h-6 w-6 text-teal-400 mb-3" />
                  <h3 className="font-bold text-sm text-white">Strict Role RBAC</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Granular user permission models and immutable access logs.</p>
                </div>
              </div>
            </div>

            {/* Right Sidebar with Server/Cloud Unsplash Image & Consultation Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800/80 backdrop-blur-xl relative group">
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80" 
                    alt="Cybersecurity & Cloud Compliance Infrastructure" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-teal-400" />
                      <span className="text-xs font-mono font-semibold tracking-wide">Zero-Trust Protocol</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300">
                      Encrypted
                    </span>
                  </div>
                </div>
                <div className="p-5 text-xs text-slate-300 space-y-2">
                  <h4 className="font-bold text-white text-sm">Military-Grade Security</h4>
                  <p className="leading-relaxed text-slate-400">All data pipelines adhere to strict global regulatory frameworks and automated compliance audits.</p>
                </div>
              </div>

              <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-700 space-y-4 text-center shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                <h3 className="text-lg font-bold text-white relative z-10">Don't See Your Specific Sector?</h3>
                <p className="text-slate-300 text-xs leading-relaxed relative z-10">
                  Our core full-stack software, AI automation, and cloud engineering principles adapt seamlessly to complex domain requirements.
                </p>
                <Button 
                  href="/request-consultation" 
                  variant="secondary" 
                  size="md" 
                  className="w-full relative z-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 border-0 text-xs py-2.5"
                >
                  Schedule a Tech Architecture Call
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 lg:py-16 relative bg-[#EBF3FF] border-t border-slate-200/80">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 text-center space-y-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Ready to Build an Industry-Leading Platform?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Contact our engineering leads to review your industry's technical challenges and design an actionable solution roadmap.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Button 
              href="/request-project" 
              variant="secondary" 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3 border-0 text-sm"
            >
              Start a Project
            </Button>
            <Button 
              href="/contact" 
              variant="ghost" 
              size="lg" 
              className="text-slate-800 border border-slate-300 bg-white/80 hover:bg-slate-100 hover:border-slate-400 px-6 py-3 shadow-sm text-sm"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}