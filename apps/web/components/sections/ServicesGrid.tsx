import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '../ui/SectionHeading';
import { Bot, Code, Globe, Smartphone, ShieldAlert, Cloud, BarChart3, RefreshCw, ArrowRight } from 'lucide-react';

export const ServicesGrid: React.FC = () => {
  const services = [
    { title: 'AI & Automation', slug: 'ai-automation', icon: Bot, desc: 'Workflow automation, chatbots, predictive analytics, and custom AI tools.' },
    { title: 'Software Development', slug: 'software-development', icon: Code, desc: 'Enterprise ERPs, CRMs, POS platforms, and robust custom business systems.' },
    { title: 'Web Development', slug: 'web-development', icon: Globe, desc: 'High-performance, dynamic, SEO-optimized web applications and corporate portals.' },
    { title: 'Mobile Applications', slug: 'mobile-development', icon: Smartphone, desc: 'Native and cross-platform mobile solutions for iOS and Android.' },
    { title: 'Cybersecurity', slug: 'cybersecurity', icon: ShieldAlert, desc: 'Vulnerability assessments, network defense, threat monitoring, and data safety.' },
    { title: 'Cloud & IT Solutions', slug: 'cloud-it', icon: Cloud, desc: 'Cloud migration, infrastructure management, data backups, and IT support.' },
    { title: 'Data Analytics', slug: 'data-analytics', icon: BarChart3, desc: 'Business intelligence dashboards, KPI tracking, and data visualization.' },
    { title: 'Digital Transformation', slug: 'digital-transformation', icon: RefreshCw, desc: 'Strategic consulting to modernize legacy systems and operations.' },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Core Capabilities"
          title="Our Technology Services"
          subtitle="Comprehensive digital solutions engineered for modern enterprises, SMEs, and public institutions."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="group p-6 rounded-xl border border-slate-200 bg-mavora-light/40 hover:border-mavora-blue hover:bg-white transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-mavora-blue/10 text-mavora-blue flex items-center justify-center mb-5 group-hover:bg-mavora-blue group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-mavora-navy mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{s.desc}</p>
                </div>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-mavora-blue hover:text-mavora-navy transition-colors mt-auto"
                >
                  Learn More <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};