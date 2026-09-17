import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

export const SolutionMapping: React.FC = () => {
  const mappings = [
    { problem: 'Manual Processes', solution: 'AI Workflow Automation' },
    { problem: 'Poor Customer Communication', solution: 'Chatbots & Integrated CRM' },
    { problem: 'Inaccurate Reporting', solution: 'Data Analytics & BI Dashboards' },
    { problem: 'Security Concerns & Breaches', solution: 'Cybersecurity Assessment & Defense' },
    { problem: 'Manual Sales Management', solution: 'Custom CRM Platform' },
    { problem: 'Inventory & Stock Discrepancies', solution: 'Enterprise POS & ERP Systems' },
    { problem: 'Outdated Web Presence', solution: 'Modern Next.js Web Development' },
    { problem: 'Complex Operations', solution: 'Custom Tailored Enterprise Software' },
  ];

  return (
    <section className="relative bg-[#EBF3FF] text-slate-900 overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24">
      {/* Background Grids & Ambient Lighting */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-blue-400/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-teal-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Problem & Solution"
          title="Transforming Challenges Into Advantages"
          subtitle="Match your operational friction directly with Mavora's technological remedies."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {mappings.map((m, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-between p-4 rounded-xl bg-white/90 border border-slate-200/80 shadow-sm hover:border-blue-400 hover:shadow-md transition-all duration-300"
            >
              <span className="text-sm font-medium text-slate-700">{m.problem}</span>
              <ArrowRight className="h-4 w-4 text-blue-600 shrink-0 mx-2" />
              <span className="text-sm font-semibold text-teal-700 text-right">{m.solution}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};