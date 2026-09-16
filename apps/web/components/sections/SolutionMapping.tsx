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
    <section className="py-20 bg-mavora-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Problem & Solution"
          title="Transforming Challenges Into Advantages"
          subtitle="Match your operational friction directly with Mavora's technological remedies."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {mappings.map((m, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <span className="text-sm font-medium text-slate-300">{m.problem}</span>
              <ArrowRight className="h-4 w-4 text-mavora-teal shrink-0 mx-2" />
              <span className="text-sm font-bold text-mavora-teal text-right">{m.solution}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};