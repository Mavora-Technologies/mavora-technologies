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
    <div className="min-h-screen bg-mavora-light">
      {/* Hero Section */}
      <section className="bg-mavora-navy text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1769FF_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-mavora-blue/20 text-mavora-teal flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <Badge variant="teal">Service Deep Dive</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-mavora-teal font-medium">
              {service.tagline}
            </p>
            <p className="text-slate-300 text-base leading-relaxed pt-2">
              {service.whatWeProvide}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button href="/request-project" variant="secondary" size="lg">
                Request This Service <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/request-consultation" variant="ghost" size="lg" className="text-white border border-slate-700 hover:border-mavora-teal">
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Statement */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-red-50/50 border border-red-200/80 p-8 rounded-xl">
              <div className="flex items-center gap-3 text-red-700 font-bold text-lg mb-3">
                <AlertTriangle className="h-6 w-6" />
                <span>The Challenge</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm">
                {service.problemStatement}
              </p>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-200/80 p-8 rounded-xl">
              <div className="flex items-center gap-3 text-emerald-800 font-bold text-lg mb-3">
                <CheckCircle2 className="h-6 w-6 text-mavora-teal" />
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
      <section className="py-20 bg-mavora-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Key Capabilities */}
            <div className="lg:col-span-7 bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-mavora-navy">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.keyCapabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-mavora-light/60 border border-slate-100">
                    <CheckCircle2 className="h-5 w-5 text-mavora-teal shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-mavora-navy">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Benefits */}
            <div className="lg:col-span-5 bg-mavora-navy text-white p-8 rounded-xl shadow-lg space-y-6">
              <h2 className="text-2xl font-bold text-mavora-teal">Strategic Benefits</h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-mavora-teal shrink-0 mt-2" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Technology Approach</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{service.techApproach}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Typical Use Cases */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Real-World Impact"
            title="Typical Industry Use Cases"
            subtitle={`How organizations deploy Mavora's ${service.title.toLowerCase()} capabilities.`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.useCases.map((useCase, i) => (
              <div key={i} className="p-6 rounded-xl bg-mavora-light/60 border border-slate-200">
                <span className="text-xs font-mono font-bold text-mavora-blue uppercase tracking-wider">Use Case 0{i + 1}</span>
                <p className="mt-3 text-sm font-medium text-mavora-navy leading-relaxed">
                  {useCase}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="py-20 bg-mavora-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Methodology"
            title="Our Delivery Process"
            subtitle="Predictable, transparent execution from kickoff to production deployment."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                <h3 className="text-lg font-bold text-mavora-navy mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {service.faqs.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="FAQ"
              title="Frequently Asked Questions"
              centered
            />

            <div className="space-y-6">
              {service.faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-xl border border-slate-200 bg-mavora-light/30 space-y-2">
                  <h3 className="text-base font-bold text-mavora-navy flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-mavora-blue shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call To Action */}
      <section className="py-16 bg-mavora-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Ready to Implement {service.title}?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Discuss your requirements with our engineering team and receive a structured execution proposal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Button href="/request-project" variant="secondary" size="lg">
              Start a Project
            </Button>
            <Button href="/services" variant="ghost" size="lg" className="text-white border border-slate-700 hover:border-mavora-teal">
              View All Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}