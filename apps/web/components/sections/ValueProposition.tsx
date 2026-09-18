import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Shield, Lightbulb, Target, Layers, Headphones, TrendingUp } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Intelligent Solutions',
      description: 'Leveraging AI and modern architectures to transform complex workflows into streamlined automated processes.',
    },
    {
      icon: Shield,
      title: 'Secure by Design',
      description: 'Security protocols integrated from day one, protecting critical business data against modern threats.',
    },
    {
      icon: Target,
      title: 'Business-Focused Technology',
      description: 'We don’t just write code; we deploy technology specifically designed to meet key business milestones.',
    },
    {
      icon: Layers,
      title: 'Scalable Architecture',
      description: 'Future-ready digital platforms engineered to scale seamlessly as your customer base and operations expand.',
    },
    {
      icon: Headphones,
      title: 'Reliable Support',
      description: 'Continuous operational monitoring, regular system updates, and dedicated technical support teams.',
    },
    {
      icon: TrendingUp,
      title: 'Measurable Impact',
      description: 'Focusing on actionable outcomes: reduced overhead, enhanced user engagement, and maximized ROI.',
    },
  ];

  return (
    <section className="py-20 bg-mavora-light w-full overflow-hidden">
      {/* Edge-to-Edge Fluid Container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 2xl:px-32">
        <SectionHeading
          badge="Why Mavora"
          title="Technology That Solves Real Business Problems"
          subtitle="We bridge the gap between complex software engineering and tangible organizational growth."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-8 pt-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-mavora-navy/5 flex items-center justify-center text-mavora-blue mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-mavora-navy mb-3">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};