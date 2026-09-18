import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

export const SolutionMapping: React.FC = () => {
  const mappings = [
    { 
      problem: 'Manual Processes', 
      solution: 'AI Workflow Automation',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      description: 'Automate repetitive tasks to save time and eliminate human error.'
    },
    { 
      problem: 'Poor Customer Communication', 
      solution: 'Chatbots & Integrated CRM',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      description: 'Keep clients engaged 24/7 with smart omnichannel tools.'
    },
    { 
      problem: 'Inaccurate Reporting', 
      solution: 'Data Analytics & BI Dashboards',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      description: 'Gain real-time visibility into metrics that drive growth.'
    },
    { 
      problem: 'Security Concerns & Breaches', 
      solution: 'Cybersecurity Assessment & Defense',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
      description: 'Harden your digital infrastructure against advanced threats.'
    },
    { 
      problem: 'Manual Sales Management', 
      solution: 'Custom CRM Platform',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
      description: 'Streamline lead pipelines and boost conversion rates.'
    },
    { 
      problem: 'Inventory & Stock Discrepancies', 
      solution: 'Enterprise POS & ERP Systems',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      description: 'Sync physical stock levels perfectly with digital ledgers.'
    },
    { 
      problem: 'Outdated Web Presence', 
      solution: 'Modern Next.js Web Development',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      description: 'Deliver lightning-fast web experiences optimized for conversion.'
    },
    { 
      problem: 'Complex Operations', 
      solution: 'Custom Tailored Enterprise Software',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      description: 'Build robust internal tools engineered for scale.'
    },
  ];

  return (
    <section className="relative bg-[#EBF3FF] text-slate-900 overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {mappings.map((m, idx) => (
            <div 
              key={idx} 
              className="flex flex-col justify-between bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div>
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={m.image} 
                    alt={m.solution} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-900/80 text-white backdrop-blur-sm border border-slate-700">
                    Challenge #{idx + 1}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Friction Point</span>
                    <h4 className="text-sm font-bold text-slate-800">{m.problem}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-auto">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-semibold text-teal-800">
                  <span className="flex items-center gap-1.5 leading-snug">
                    <ArrowRight className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    {m.solution}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};