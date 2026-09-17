'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Send, 
  AlertCircle, 
  Code2, 
  Cpu, 
  Lock, 
  Cloud, 
  Smartphone,
  Sparkles,
  FileText,
  Coins
} from 'lucide-react';

type Currency = 'USD' | 'KES';

const SERVICE_OPTIONS = [
  { id: 'software-dev', label: 'Custom Enterprise Software', icon: Code2, desc: 'Tailored platforms, ERPs, and core business software.' },
  { id: 'ai-automation', label: 'AI & Workflow Automation', icon: Cpu, desc: 'LLM integrations, intelligent OCR, and autonomous triggers.' },
  { id: 'cybersecurity', label: 'Cybersecurity & Compliance', icon: Lock, desc: 'Zero-trust architecture, RBAC, and security audits.' },
  { id: 'cloud-it', label: 'Cloud Architecture & Migration', icon: Cloud, desc: 'High-availability infrastructure and DevOps optimization.' },
  { id: 'mobile-dev', label: 'Mobile & Cross-Platform Apps', icon: Smartphone, desc: 'Offline-first, native iOS and Android application builds.' },
];

const BUDGET_RANGES: Record<Currency, { id: string; label: string; detail: string }[]> = {
  USD: [
    { id: '10k-25k', label: '$10,000 – $25,000', detail: 'Minimum viable product (MVP) or targeted module build.' },
    { id: '25k-50k', label: '$25,000 – $50,000', detail: 'Full multi-tier application or AI pipeline integration.' },
    { id: '50k-100k', label: '$50,000 – $100,000', detail: 'Comprehensive enterprise system modernizations.' },
    { id: '100k-plus', label: '$100,000+', detail: 'Large-scale multi-system transformation & dedicated team.' },
  ],
  KES: [
    { id: '1.3m-3.25m', label: 'KES 1,300,000 – KES 3,250,000', detail: 'Minimum viable product (MVP) or targeted module build.' },
    { id: '3.25m-6.5m', label: 'KES 3,250,000 – KES 6,500,000', detail: 'Full multi-tier application or AI pipeline integration.' },
    { id: '6.5m-13m', label: 'KES 6,500,000 – KES 13,000,000', detail: 'Comprehensive enterprise system modernizations.' },
    { id: '13m-plus', label: 'KES 13,000,000+', detail: 'Large-scale multi-system transformation & dedicated team.' },
  ],
};

const TIMEFRAMES = [
  { id: 'immediate', label: 'Immediate (< 1 month)' },
  { id: 'quarter', label: 'This Quarter (1–3 months)' },
  { id: 'planning', label: 'Planning Phase (3–6 months)' },
];

export default function RequestProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    selectedServices: [] as string[],
    currency: 'USD' as Currency,
    budget: '25k-50k',
    timeline: 'quarter',
    projectOverview: '',
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    requestNda: true,
  });

  const handleCurrencyChange = (newCurrency: Currency) => {
    const defaultBudget = BUDGET_RANGES[newCurrency][1].id;
    setFormData((prev) => ({
      ...prev,
      currency: newCurrency,
      budget: defaultBudget,
    }));
  };

  const toggleService = (id: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(id);
      if (exists) {
        return { ...prev, selectedServices: prev.selectedServices.filter((s) => s !== id) };
      }
      return { ...prev, selectedServices: [...prev.selectedServices, id] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/projects/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-hidden">
      
      {/* Hero Header */}
      <section className="relative bg-[#EBF3FF] text-slate-900 py-20 lg:py-28 overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md mb-4">
              Project Initiation
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-2 text-slate-900">
              Scope Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">Engineering Build.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Define your project requirements, select capability domains, and estimate budgets in USD or KES to receive a formal technical roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-20 relative bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 lg:p-10 shadow-sm">
              
              {/* Progress Bar */}
              {status !== 'success' && (
                <div className="mb-10 flex items-center justify-between border-b border-slate-200/80 pb-6">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                      currentStep === 1 ? 'bg-slate-900 text-teal-400' : 'bg-teal-500 text-white'
                    }`}>
                      1
                    </span>
                    <span className={`text-xs font-bold ${currentStep === 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                      Scope & Budget
                    </span>
                  </div>

                  <div className="h-px bg-slate-200 flex-1 mx-4" />

                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                      currentStep === 2 ? 'bg-slate-900 text-teal-400' : 'bg-slate-100 text-slate-400'
                    }`}>
                      2
                    </span>
                    <span className={`text-xs font-bold ${currentStep === 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                      Contact & Specs
                    </span>
                  </div>
                </div>
              )}

              {status === 'success' ? (
                <div className="p-10 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Project Request Received</h3>
                    <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto leading-relaxed">
                      Thank you for providing your project parameters ({formData.currency} Budget Tier). A Lead Solution Architect will review your specifications and contact you within 24 business hours.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-center gap-4">
                    <Button href="/" variant="outline" size="md" className="bg-white border-slate-300 hover:bg-slate-50">
                      Return Home
                    </Button>
                    <Button href="/projects" variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md shadow-blue-600/25">
                      Explore Case Studies
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Step 1: Capabilities & Multi-Currency Budget */}
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      
                      {/* Technical Capabilities */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-2">
                          1. Select Required Technical Capabilities *
                        </label>
                        <p className="text-xs text-slate-500 mb-4">Choose one or more engineering domains for your platform.</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {SERVICE_OPTIONS.map((srv) => {
                            const Icon = srv.icon;
                            const selected = formData.selectedServices.includes(srv.id);
                            return (
                              <button
                                type="button"
                                key={srv.id}
                                onClick={() => toggleService(srv.id)}
                                className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 shadow-sm ${
                                  selected 
                                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20' 
                                    : 'border-slate-200/80 bg-white/80 hover:bg-white hover:border-blue-300'
                                }`}
                              >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                  selected ? 'bg-slate-900 text-teal-400' : 'bg-slate-100 text-slate-500'
                                }`}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <span className="font-bold text-sm text-slate-900 block">{srv.label}</span>
                                  <span className="text-xs text-slate-500 mt-1 block leading-relaxed">{srv.desc}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Multi-Currency Budget Selection */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                            2. Target Investment Range *
                          </label>

                          {/* Currency Switcher Toggle */}
                          <div className="inline-flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200/80">
                            <button
                              type="button"
                              onClick={() => handleCurrencyChange('USD')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                formData.currency === 'USD'
                                  ? 'bg-slate-900 text-white shadow-sm'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              <Coins className="w-3.5 h-3.5" /> USD ($)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCurrencyChange('KES')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                formData.currency === 'KES'
                                  ? 'bg-slate-900 text-white shadow-sm'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              <Coins className="w-3.5 h-3.5" /> KES (KSh)
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {BUDGET_RANGES[formData.currency].map((b) => (
                            <button
                              type="button"
                              key={b.id}
                              onClick={() => setFormData({ ...formData, budget: b.id })}
                              className={`p-4 rounded-2xl border text-left transition-all shadow-sm ${
                                formData.budget === b.id 
                                  ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600' 
                                  : 'border-slate-200 bg-white hover:border-blue-300'
                              }`}
                            >
                              <span className="text-xs font-bold text-slate-900 block">{b.label}</span>
                              <span className="text-[11px] text-slate-500 mt-0.5 block">{b.detail}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Execution Timeframe */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-2">
                          3. Target Execution Timeframe *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {TIMEFRAMES.map((t) => (
                            <button
                              type="button"
                              key={t.id}
                              onClick={() => setFormData({ ...formData, timeline: t.id })}
                              className={`p-3 text-center rounded-xl border text-xs font-medium transition-all shadow-sm ${
                                formData.timeline === t.id 
                                  ? 'border-slate-900 bg-slate-900 text-white shadow-md' 
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <Button
                          type="button"
                          variant="primary"
                          size="lg"
                          disabled={formData.selectedServices.length === 0}
                          onClick={() => setCurrentStep(2)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3 border-0 flex items-center gap-2"
                        >
                          Next: Contact & Specs <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Details & Briefing */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Alex Morgan"
                            className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 shadow-sm transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Corporate Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.workEmail}
                            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                            placeholder="alex@company.com"
                            className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 shadow-sm transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Organization / Company Name
                          </label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="Enterprise Inc."
                            className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 shadow-sm transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+254 700 000 000"
                            className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 shadow-sm transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Project Brief / High-Level Goals *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.projectOverview}
                          onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
                          placeholder="Outline core business goals, target user personas, system integrations required, or technical bottlenecks..."
                          className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 shadow-sm transition-all"
                        />
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600 shrink-0" />
                          <div className="text-xs">
                            <span className="font-bold text-slate-900 block">Mutual Non-Disclosure Agreement (NDA)</span>
                            <span className="text-slate-500">Require an NDA prior to technical architecture discussion?</span>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.requestNda}
                          onChange={(e) => setFormData({ ...formData, requestNda: e.target.checked })}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>

                      {status === 'error' && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                          <span>An error occurred while submitting your brief. Please try again or email info@mavora.co</span>
                        </div>
                      )}

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back to Capabilities
                        </button>

                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={status === 'submitting'}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3 border-0 flex items-center gap-2"
                        >
                          {status === 'submitting' ? (
                            'Submitting Brief...'
                          ) : (
                            <>
                              Submit Project Brief <Send className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                </form>
              )}

            </div>

            {/* Side Process Panel (Dark Strategic Card) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none" />

                <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider relative z-10 border-b border-slate-800 pb-4">
                  <Sparkles className="h-4 w-4" />
                  <span>The Mavora Engagement</span>
                </div>

                <div className="space-y-5 text-xs text-slate-300 relative z-10">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-teal-400 flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Requirements Assessment</strong>
                      Our solution team reviews your project scope and domain compliance needs.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-teal-400 flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Architectural Strategy Call</strong>
                      A 30-minute technical session to refine tech stack, integrations, and milestones.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-teal-400 flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Formal Proposal & Roadmap</strong>
                      Detailed project estimate in KES or USD, milestone breakdown, and SLA commitments.
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 space-y-3 text-xs relative z-10">
                  <div className="flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="h-4 w-4 text-teal-400 shrink-0" />
                    <span>Strict IP ownership & zero-trust security</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="h-4 w-4 text-teal-400 shrink-0" />
                    <span>24-hour response time guarantee</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/80 backdrop-blur-md text-xs text-slate-600 space-y-2 shadow-sm">
                <h4 className="font-bold text-slate-900 text-sm">Direct Contact</h4>
                <p className="leading-relaxed">Have an RFP ready or prefer direct contact with our engineering desk?</p>
                <a href="mailto:info@mavoratechnologies.com" className="font-bold text-blue-600 hover:text-blue-700 hover:underline block pt-1">
                  info@mavoratechnologies.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}