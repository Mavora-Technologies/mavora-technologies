'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight, ShieldCheck, Cpu, Cloud, Database, Code2, MapPin, Sparkles } from 'lucide-react';

const offerings = [
  "Custom Software Solutions",
  "Business AI Automation",
  "Zero-Trust Cybersecurity",
  "Cloud IT Infrastructure",
  "Data Analytics & Mobile Apps"
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideState, setSlideState] = useState<'visible' | 'slide-out' | 'slide-in'>('visible');

  // Slow, smooth right-to-left slide animation loop (4.5s interval, 1s transition)
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideState('slide-out');

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % offerings.length);
        setSlideState('slide-in');

        requestAnimationFrame(() => {
          setSlideState('visible');
        });
      }, 900);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  let animationClasses = "opacity-100 translate-x-0";
  if (slideState === 'slide-out') {
    animationClasses = "opacity-0 -translate-x-12";
  } else if (slideState === 'slide-in') {
    animationClasses = "opacity-0 translate-x-12";
  }

  return (
    <section className="relative bg-[#EBF3FF] text-slate-900 overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 w-full">

      {/* 1. Background Image Layer */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-teal-500/5 to-transparent pointer-events-none"
      />

      {/* 2. Soft Ambient Lighting & Grids for Light Theme */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Edge-to-Edge Fluid Container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-20 2xl:px-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Copy Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Clean Light-Theme Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin duration-3000" />
                Kenya’s Leading ICT & Software Partner
              </span>
            </div>

            {/* Headline with Vibrant Gradient Text */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.2]">
              Empowering Businesses With <br className="hidden sm:inline" />
              <span
                className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700 transition-all duration-1000 transform ${animationClasses}`}
              >
                {offerings[currentIndex]}
              </span>
            </h1>

            {/* Clear Body Text */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Mavora Technologies delivers high-performance software development, business AI automation, zero-trust cybersecurity, and cloud IT infrastructure for enterprises and SMEs <strong className="text-slate-900 font-semibold"> Locally, and Internationally. </strong>
            </p>

            {/* Coverage Tag Snippet */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-600 font-mono pt-1">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Nationwide ICT Support & Regional Tech Hubs</span>
            </div>

            {/* High-Visibility CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                href="/request-project"
                variant="secondary"
                size="md"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 hover:scale-[1.02] transition-all duration-300 text-sm px-6 py-3 border-0"
              >
                Start a Project <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                href="/services"
                variant="ghost"
                size="md"
                className="w-full sm:w-auto text-slate-800 border border-slate-300 bg-white/80 hover:bg-slate-100 hover:border-slate-400 transition-all duration-300 text-sm px-6 py-3 shadow-sm"
              >
                Explore Our Services
              </Button>
            </div>
          </div>

          {/* Interactive Advanced Technology Visual Column (Clean Light Glass Card) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl bg-white/90 border border-slate-200/80 p-5 sm:p-6 shadow-[0_20px_50px_rgba(37,99,235,0.12)] backdrop-blur-2xl flex flex-col justify-between group hover:border-blue-400 transition-all duration-500">

              {/* Terminal Header */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-sm" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-sm" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-sm" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  <span className="text-[11px] font-mono text-teal-700 font-medium">mavora-core-v2.6</span>
                </div>
              </div>

              {/* Node Architecture Interactive Grid */}
              <div className="grid grid-cols-2 gap-3 my-auto">

                {/* Card 1 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5 hover:bg-blue-50/50 hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 cursor-default shadow-sm">
                  <div className="p-1.5 rounded-lg bg-teal-100 text-teal-700 shadow-inner">
                    <Cpu className="h-4 w-4 shrink-0" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-900">AI Automation</p>
                    <p className="text-[9px] text-slate-500">Intelligent Pipelines</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5 hover:bg-blue-50/50 hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-default shadow-sm">
                  <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 shadow-inner">
                    <Code2 className="h-4 w-4 shrink-0" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-900">Custom Apps</p>
                    <p className="text-[9px] text-slate-500">Full-Stack Solutions</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5 hover:bg-blue-50/50 hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 cursor-default shadow-sm">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 shadow-inner">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-900">Cybersecurity</p>
                    <p className="text-[9px] text-slate-500">Zero-Trust Security</p>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5 hover:bg-blue-50/50 hover:border-sky-300 hover:-translate-y-1 transition-all duration-300 cursor-default shadow-sm">
                  <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700 shadow-inner">
                    <Cloud className="h-4 w-4 shrink-0" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-900">Cloud Systems</p>
                    <p className="text-[9px] text-slate-500">Scalable & Secure</p>
                  </div>
                </div>

              </div>

              {/* Terminal Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-blue-600" />
                  <span>Enterprise Infrastructure</span>
                </div>
                <span className="text-emerald-700 font-mono font-medium bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[10px]">
                  99.99% Uptime
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};