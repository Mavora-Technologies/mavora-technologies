import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES_DATA } from '@/lib/services-data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Bot, 
  Code, 
  Globe, 
  Smartphone, 
  ShieldAlert, 
  Cloud, 
  BarChart3, 
  RefreshCw, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technology Services | Mavora Technologies Ltd',
  description: 'Explore Mavora Technologies services: AI automation, enterprise software, cybersecurity, cloud IT, web/mobile development, data analytics, and digital transformation.',
};

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

export default function ServicesPage() {
  const servicesList = Object.values(SERVICES_DATA);

  return (
    <div className="min-h-screen bg-mavora-light">
      {/* Services Hero */}
      <section className="bg-mavora-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1769FF_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="teal">Our Capabilities</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-4">
              Intelligent Technology Services Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-mavora-teal to-blue-400">Scale & Impact.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              From enterprise software and AI automation to robust cybersecurity and cloud platforms, Mavora Technologies designs and deploys solutions that solve real business problems.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Full-Spectrum IT"
            title="Explore Our Core Services"
            subtitle="Select a service below to view detailed capabilities, technology approaches, and real-world application examples."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service) => {
              const Icon = ICON_MAP[service.iconName] || Code;
              return (
                <div 
                  key={service.slug}
                  className="bg-mavora-light/50 border border-slate-200 rounded-xl p-8 hover:border-mavora-blue hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-mavora-blue/10 text-mavora-blue flex items-center justify-center mb-6 group-hover:bg-mavora-blue group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-mavora-navy mb-3">{service.title}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>
                    
                    {/* Quick Capabilities */}
                    <ul className="space-y-2 mb-8 text-xs text-slate-600">
                      {service.keyCapabilities.slice(0, 3).map((cap, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-mavora-teal shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-sm font-bold text-mavora-blue hover:text-mavora-navy transition-colors pt-4 border-t border-slate-200/80"
                  >
                    View Full Service Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-mavora-navy text-white border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Need a Custom Combination of Services?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            We frequently integrate AI automation, custom software, and cybersecurity into single, cohesive business platforms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Button href="/request-project" variant="secondary" size="lg">
              Start a Project
            </Button>
            <Button href="/request-consultation" variant="ghost" size="lg" className="text-white border border-slate-700 hover:border-mavora-teal">
              Talk to an Expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}