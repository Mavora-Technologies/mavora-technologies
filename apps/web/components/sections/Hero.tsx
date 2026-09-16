import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight, ShieldCheck, Cpu, Cloud, Database, Code2, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-mavora-navy text-white overflow-hidden py-20 lg:py-28">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1769FF_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-mavora-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-mavora-teal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copy Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <Badge variant="teal">Kenya’s Leading ICT & Software Partner</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Empowering Businesses With <span className="text-transparent bg-clip-text bg-gradient-to-r from-mavora-teal to-blue-400">Custom Software, AI & IT Solutions.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Mavora Technologies delivers high-performance software development, business AI automation, zero-trust cybersecurity, and cloud IT infrastructure for enterprises and SMEs across <strong className="text-white font-semibold">Nairobi, Mombasa, Kisumu, Eldoret, Kisii, Busia, Machakos, Murang'a</strong>, and nationwide.
            </p>

            {/* Coverage Tag Snippet */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400 font-mono pt-1">
              <MapPin className="w-3.5 h-3.5 text-mavora-teal shrink-0" />
              <span>Nationwide ICT Support & Regional Tech Hubs</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button href="/request-project" variant="secondary" size="lg" className="w-full sm:w-auto">
                Start a Project <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/services" variant="ghost" size="lg" className="w-full sm:w-auto text-white hover:text-mavora-teal border border-slate-700 hover:border-mavora-teal">
                Explore Our Services
              </Button>
            </div>
          </div>

          {/* Abstract Technology Visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-slate-900 to-mavora-navy border border-slate-800 p-8 shadow-2xl flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-mavora-teal">mavora-core-v2.6</span>
              </div>

              {/* Node Architecture Graphic */}
              <div className="grid grid-cols-2 gap-4 my-auto">
                <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
                  <Cpu className="text-mavora-teal h-6 w-6 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">AI Automation</p>
                    <p className="text-[10px] text-slate-400">Intelligent Pipelines</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
                  <Code2 className="text-mavora-blue h-6 w-6 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Custom Apps</p>
                    <p className="text-[10px] text-slate-400">Full-Stack Solutions</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
                  <ShieldCheck className="text-emerald-400 h-6 w-6 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Cybersecurity</p>
                    <p className="text-[10px] text-slate-400">Zero-Trust Security</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center gap-3">
                  <Cloud className="text-sky-400 h-6 w-6 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Cloud Systems</p>
                    <p className="text-[10px] text-slate-400">Scalable & Secure</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-mavora-teal" />
                  <span>Enterprise Infrastructure</span>
                </div>
                <span className="text-emerald-400 font-mono">99.99% Uptime</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};