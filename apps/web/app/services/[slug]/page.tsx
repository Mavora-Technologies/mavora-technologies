import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES_DATA } from '@/lib/services-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { 
  Bot, 
  Code, 
  Globe, 
  Smartphone, 
  ShieldAlert, 
  Cloud, 
  BarChart3, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Bot,
  Code,
  Globe,
  Smartphone,
  ShieldAlert,
  Cloud,
  BarChart3,
  RefreshCw
};

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    return { title: 'Service Not Found | Mavora Technologies' };
  }

  return {
    title: `${service.title} Services | Mavora Technologies Ltd`,
    description: service.shortDesc,
  };
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  const Icon = ICON_MAP[service.iconName] || Code;

  const processSteps = [
    { title: '1. Discovery', desc: 'Requirements capture & operational evaluation.' },
    { title: '2. Architecture', desc: 'Secure system blueprinting & stack selection.' },
    { title: '3. Execution', desc: 'Iterative, high-quality full-stack engineering.' },
    { title: '4. Deployment', desc: 'Automated testing, security audits & launch.' },
  ];

  return (
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-[#EBF3FF] text-slate-900 py-20 lg:py-28 overflow-hidden border-b border-slate-200/80">
        {/* Background Grids & Ambient Lighting */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-inner">
                <Icon className="h-6 w-6" />
              </div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
                Service Deep Dive
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
              {service.title}
            </h1>
            <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">
              {service.tagline}
            </p>
            <p className="text-slate-600 text-base leading-relaxed pt-2">
              {service.whatWeProvide}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                href="/request-project" 
                variant="secondary" 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3 border-0"
              >
                Request This Service <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                href="/request-consultation" 
                variant="ghost" 
                size="lg" 
                className="text-slate-800 border border-slate-300 bg-white/80 hover:bg-slate-100 hover:border-slate-400 px-6 py-3 shadow-sm"
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Statement */}
      <section className="py-16 relative bg-white/40 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 text-red-700 font-bold text-lg mb-3">
                <AlertTriangle className="h-6 w-6" />
                <span>The Challenge</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm">
                {service.problemStatement}
              </p>
            </div>

            <div className="bg-teal-50/80 backdrop-blur-sm border border-teal-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 text-teal-800 font-bold text-lg mb-3">
                <CheckCircle2 className="h-6 w-6 text-teal-600" />
                <span>The Mavora Solution</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm">
                {service.whatWeProvide}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Capabilities & Benefits */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Key Capabilities */}
            <div className="lg:col-span-7 bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.keyCapabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100/80 hover:border-blue-200 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-800">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Benefits (Contrasting Dark Card) */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-2xl shadow-xl space-y-6 border border-slate-800 relative overflow-hidden">
              {/* Subtle inner glow for the dark card */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none" />
              
              <h2 className="text-2xl font-bold text-teal-400 relative z-10">Strategic Benefits</h2>
              <ul className="space-y-4 relative z-10">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 mt-6 border-t border-slate-800 relative z-10">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Technology Approach</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{service.techApproach}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Typical Use Cases */}
      <section className="py-20 relative bg-white/40 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Real-World Impact"
            title="Typical Industry Use Cases"
            subtitle={`How organizations deploy Mavora's ${service.title.toLowerCase()} capabilities.`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {service.useCases.map((useCase, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">Use Case 0{i + 1}</span>
                <p className="mt-3 text-sm font-medium text-slate-800 leading-relaxed">
                  {useCase}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Methodology"
            title="Our Delivery Process"
            subtitle="Predictable, transparent execution from kickoff to production deployment."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 text-center shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300">
                <div className="w-10 h-10 mx-auto rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-bold text-sm mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title.replace(/^\d+\.\s/, '')}</h3>
                <p className="text-xs text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {service.faqs.length > 0 && (
        <section className="py-20 relative bg-white/40 border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading
              badge="FAQ"
              title="Frequently Asked Questions"
              centered
            />

            <div className="space-y-4 mt-8">
              {service.faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm hover:border-blue-200 transition-colors space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed pl-8">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call To Action */}
      <section className="py-16 relative bg-[#EBF3FF] border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl font-extrabold text-slate-900">Ready to Implement {service.title}?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discuss your requirements with our engineering team and receive a structured execution proposal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Button 
              href="/request-project" 
              variant="secondary" 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3 border-0"
            >
              Start a Project
            </Button>
            <Button 
              href="/services" 
              variant="ghost" 
              size="lg" 
              className="text-slate-800 border border-slate-300 bg-white/80 hover:bg-slate-100 hover:border-slate-400 px-6 py-3 shadow-sm"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}