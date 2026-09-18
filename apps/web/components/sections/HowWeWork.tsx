import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';

export const HowWeWork: React.FC = () => {
  const steps = [
    { step: '01', title: 'DISCOVER', desc: 'Identify core operational goals and requirements.' },
    { step: '02', title: 'UNDERSTAND', desc: 'Analyze existing bottlenecks and architecture.' },
    { step: '03', title: 'DESIGN', desc: 'Blueprint secure, high-performing UI/UX and databases.' },
    { step: '04', title: 'BUILD', desc: 'Develop clean, scalable frontend and backend code.' },
    { step: '05', title: 'TEST', desc: 'Perform security audits and end-to-end testing.' },
    { step: '06', title: 'DEPLOY', desc: 'Launch onto production-grade serverless platforms.' },
    { step: '07', title: 'SUPPORT', desc: 'Provide 24/7 technical assistance and maintenance.' },
    { step: '08', title: 'GROW', desc: 'Iterate with analytics to drive scalable business expansion.' },
  ];

  return (
    <section className="py-20 bg-mavora-light w-full overflow-hidden">
      {/* Edge-to-Edge Fluid Container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 2xl:px-32">
        <SectionHeading
          badge="Execution Methodology"
          title="How We Deliver Value"
          subtitle="Our structured end-to-end process guarantees predictability, quality, and precision."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8 gap-6 pt-6">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-blue-300 transition-all duration-300">
              <span className="text-4xl font-extrabold text-slate-100 absolute top-3 right-4 select-none">
                {s.step}
              </span>
              <h3 className="text-lg font-bold text-mavora-blue mb-2 relative z-10">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed relative z-10">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};