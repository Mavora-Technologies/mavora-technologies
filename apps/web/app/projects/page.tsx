'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
    <div className="min-h-screen bg-mavora-light">
      {/* Hero Section */}
      <section className="bg-mavora-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1769FF_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="teal">Proven Track Record</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-4">
              Engineered Solutions. <span className="text-transparent bg-clip-text bg-gradient-to-r from-mavora-teal to-blue-400">Measurable Impact.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Explore how Mavora Technologies partners with organizations to solve complex operational challenges through full-stack software, custom AI, robust cybersecurity, and scalable cloud architectures.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Case Studies"
            title="Featured Engineering Projects"
            subtitle="Filter by technology capability to review architectural approaches, tech stacks, and quantifiable outcomes."
            centered
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-mavora-navy text-mavora-teal shadow-md'
                    : 'bg-mavora-light text-slate-600 hover:bg-slate-200'
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
                className="bg-mavora-light/60 border border-slate-200 rounded-2xl p-8 lg:p-10 hover:border-mavora-blue/50 transition-all shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Main Info */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="teal">{project.categoryLabel}</Badge>
                    <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-mavora-blue" />
                      {project.clientIndustry}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-mavora-navy">
                    {project.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-lg bg-red-50/60 border border-red-200/60 text-xs">
                      <span className="font-bold text-red-800 block mb-0.5">The Bottleneck:</span>
                      <span className="text-slate-700">{project.challenge}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200/60 text-xs">
                      <span className="font-bold text-emerald-900 block mb-0.5">Engineering Solution:</span>
                      <span className="text-slate-700">{project.solution}</span>
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="pt-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">Technology Stack:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-mono font-medium text-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Impact Metrics Box */}
                <div className="lg:col-span-5 bg-mavora-navy text-white p-8 rounded-xl shadow-md flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-mavora-teal font-mono text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-3">
                      <Layers className="h-4 w-4" />
                      <span>Measured Business Impact</span>
                    </div>

                    <ul className="space-y-4">
                      {project.impactMetrics.map((metric, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-mavora-teal shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-200 leading-tight">{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Enterprise Build</span>
                    <Button href="/request-project" variant="secondary" size="sm" className="text-xs">
                      Build Similar Solution <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Call to Action */}
      <section className="py-16 bg-mavora-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Have a Custom Technical Challenge?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            We partner with enterprises to design software architectures from scratch or optimize existing legacy platforms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Button href="/request-project" variant="secondary" size="lg">
              Start a Project
            </Button>
            <Button href="/request-consultation" variant="ghost" size="lg" className="text-white border border-slate-700 hover:border-mavora-teal">
              Request Technical Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}