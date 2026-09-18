'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS_DATA, ProjectItem } from '@/lib/projects-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { 
  FolderGit2, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Building2, 
  ExternalLink 
} from 'lucide-react';

const CATEGORIES = [
  { key: 'all', label: 'All Projects' },
  { key: 'ai-automation', label: 'AI & Automation' },
  { key: 'software-development', label: 'Software Dev' },
  { key: 'cybersecurity', label: 'Cybersecurity' },
  { key: 'cloud-it', label: 'Cloud & IT' },
  { key: 'mobile-development', label: 'Mobile Apps' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-x-hidden w-full">
      
      {/* Hero Section */}
      <section className="relative bg-[#EBF3FF] text-slate-900 pt-6 sm:pt-8 lg:pt-10 pb-16 lg:pb-24 overflow-hidden border-b border-slate-200/80 w-full">
        {/* Background Grids & Ambient Lighting */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
                Proven Track Record
              </span>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
                Engineered Solutions. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">Measurable Impact.</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Explore how Mavora Technologies partners with organizations to solve complex operational challenges through full-stack software, custom AI, robust cybersecurity, and scalable cloud architectures.
              </p>
            </div>
            <div className="lg:col-span-5 relative h-[320px] sm:h-[380px] lg:h-[420px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/85">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                alt="Digital engineering projects and metrics overview"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Projects Grid */}
      <section className="py-20 relative bg-white/40 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <SectionHeading
            badge="Case Studies"
            title="Featured Engineering Projects"
            subtitle="Filter by technology capability to review architectural approaches, tech stacks, and quantifiable outcomes."
            centered
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                  activeCategory === cat.key
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25'
                    : 'bg-white/80 text-slate-600 border-slate-200/80 hover:bg-white hover:border-blue-300 hover:text-blue-700 shadow-sm backdrop-blur-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects List */}
          <div className="space-y-12">
            {filteredProjects.map((project: ProjectItem) => (
              <div 
                key={project.id}
                className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 lg:p-10 hover:border-blue-400 hover:shadow-xl transition-all duration-300 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 group"
              >
                {/* Main Info */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 border border-blue-100 text-blue-700">
                      {project.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-mono font-semibold flex items-center gap-1.5 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/50">
                      <Building2 className="h-3.5 w-3.5 text-slate-600" />
                      {project.clientIndustry}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl bg-red-50/80 border border-red-100 text-sm shadow-sm">
                      <span className="font-bold text-red-900 flex items-center gap-2 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
                        The Bottleneck
                      </span>
                      <span className="text-slate-700 leading-relaxed text-xs">{project.challenge}</span>
                    </div>

                    <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-100 text-sm shadow-sm">
                      <span className="font-bold text-teal-900 flex items-center gap-2 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 block" />
                        Engineering Solution
                      </span>
                      <span className="text-slate-700 leading-relaxed text-xs">{project.solution}</span>
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="pt-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-3">Technology Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-mono font-semibold text-slate-600 shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Impact Metrics Box (Dark Strategic Card) */}
                <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden">
                  {/* Subtle inner glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider mb-6 border-b border-slate-800 pb-4">
                      <Layers className="h-4 w-4" />
                      <span>Measured Business Impact</span>
                    </div>

                    <ul className="space-y-5">
                      {project.impactMetrics.map((metric, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]" />
                          <span className="text-sm font-medium text-slate-200 leading-relaxed">{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex items-center justify-between relative z-10 mt-8">
                    <span className="text-xs font-mono text-slate-400">Enterprise Build</span>
                    <Button 
                      href="/request-project" 
                      variant="secondary" 
                      size="sm" 
                      className="text-xs bg-white/10 hover:bg-white/20 text-white border-0"
                    >
                      Build Similar <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Call to Action */}
      <section className="py-16 relative bg-[#EBF3FF] border-t border-slate-200/80 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 text-center space-y-6 relative z-10">
          <h2 className="text-3xl font-extrabold text-slate-900">Have a Custom Technical Challenge?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            We partner with enterprises to design software architectures from scratch or optimize existing legacy platforms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button 
              href="/request-project" 
              variant="secondary" 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3 border-0"
            >
              Start a Project
            </Button>
            <Button 
              href="/request-consultation" 
              variant="ghost" 
              size="lg" 
              className="text-slate-800 border border-slate-300 bg-white/80 hover:bg-slate-100 hover:border-slate-400 px-6 py-3 shadow-sm"
            >
              Request Technical Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}