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
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-hidden">
      {/* Services Hero */}
      <section className="relative bg-[#EBF3FF] text-slate-900 py-16 lg:py-24 overflow-hidden border-b border-slate-200/80">
        {/* Background Grids & Ambient Lighting */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md mb-4">
              Our Capabilities
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-2 text-slate-900">
              Intelligent Technology Services Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">Scale & Impact.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              From enterprise software and AI automation to robust cybersecurity and cloud platforms, Mavora Technologies designs and deploys solutions that solve real business problems.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                  className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-inner">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>
                    
                    {/* Quick Capabilities */}
                    <ul className="space-y-2 mb-8 text-xs text-slate-600">
                      {service.keyCapabilities.slice(0, 3).map((cap, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors pt-4 border-t border-slate-100"
                  >
                    View Full Service Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white/60 backdrop-blur-md border-t border-slate-200/80 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900">Need a Custom Combination of Services?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            We frequently integrate AI automation, custom software, and cybersecurity into single, cohesive business platforms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Button 
              href="/request-project" 
              variant="secondary" 
              size="md" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3 border-0"
            >
              Start a Project
            </Button>
            <Button 
              href="/request-consultation" 
              variant="ghost" 
              size="md" 
              className="text-slate-800 border border-slate-300 bg-white/80 hover:bg-slate-100 hover:border-slate-400 px-6 py-3 shadow-sm"
            >
              Talk to an Expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}