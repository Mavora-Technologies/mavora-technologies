'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Clock, 
  Coins, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  UserCheck 
} from 'lucide-react';

type Currency = 'USD' | 'KES';

const CONSULTATION_TYPES: Record<Currency, { id: string; title: string; duration: string; price: string; desc: string }[]> = {
  USD: [
    { 
      id: 'discovery', 
      title: 'Initial Discovery Call', 
      duration: '30 Minutes', 
      price: 'Free', 
      desc: 'High-level project scope review, technical feasibility, and team alignment.' 
    },
    { 
      id: 'architecture-review', 
      title: 'Deep Architecture Workshop', 
      duration: 'Half-Day Session', 
      price: '$500', 
      desc: 'Comprehensive review of your codebase, cloud setup, and security posture with a Lead Architect.' 
    },
    { 
      id: 'cto-advisory', 
      title: 'Fractional CTO / Advisory', 
      duration: 'Monthly Retainer', 
      price: '$2,000 / mo', 
      desc: 'Ongoing strategic tech leadership, vendor evaluations, and quarterly security audits.' 
    },
  ],
  KES: [
    { 
      id: 'discovery', 
      title: 'Initial Discovery Call', 
      duration: '30 Minutes', 
      price: 'Free', 
      desc: 'High-level project scope review, technical feasibility, and team alignment.' 
    },
    { 
      id: 'architecture-review', 
      title: 'Deep Architecture Workshop', 
      duration: 'Half-Day Session', 
      price: 'KES 65,000', 
      desc: 'Comprehensive review of your codebase, cloud setup, and security posture with a Lead Architect.' 
    },
    { 
      id: 'cto-advisory', 
      title: 'Fractional CTO / Advisory', 
      duration: 'Monthly Retainer', 
      price: 'KES 260,000 / mo', 
      desc: 'Ongoing strategic tech leadership, vendor evaluations, and quarterly security audits.' 
    },
  ],
};

const TIME_SLOTS = [
  'Morning (09:00 AM - 12:00 PM EAT)',
  'Afternoon (01:00 PM - 04:00 PM EAT)',
  'Evening (04:00 PM - 06:00 PM EAT)',
];

export default function RequestConsultationPage() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedType, setSelectedType] = useState('discovery');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    preferredDate: '',
    preferredTimeSlot: TIME_SLOTS[0],
    consultationType: 'discovery',
    currency: 'USD' as Currency,
    discussionTopics: '',
  });

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    setFormData((prev) => ({
      ...prev,
      currency: newCurrency,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/consultation/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, consultationType: selectedType }),
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
              Expert Advisory
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-2 text-slate-900">
              Book a Strategy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">Architecture Session.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Schedule a focused 1-on-1 consultation with our Lead Solution Architects to evaluate technical feasibility, system design, or enterprise modernization strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 relative bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Consultation Form Column */}
            <div className="lg:col-span-8 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 lg:p-10 shadow-sm">
              
              {status === 'success' ? (
                <div className="p-10 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Consultation Request Confirmed</h3>
                    <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto leading-relaxed">
                      We have logged your booking request. An invitation calendar link will be dispatched to <strong className="text-slate-900">{formData.workEmail}</strong> within 12 business hours.
                    </p>
                  </div>
                  <Button href="/" variant="outline" size="md" className="bg-white border-slate-300 hover:bg-slate-50">
                    Return to Home
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Step 1: Select Consultation Format with Currency Toggle */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                          1. Select Consultation Format *
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Choose the engagement depth that aligns with your current roadmap.</p>
                      </div>

                      {/* Currency Toggle */}
                      <div className="inline-flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200/80">
                        <button
                          type="button"
                          onClick={() => handleCurrencyChange('USD')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            currency === 'USD'
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
                            currency === 'KES'
                              ? 'bg-slate-900 text-white shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Coins className="w-3.5 h-3.5" /> KES (KSh)
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {CONSULTATION_TYPES[currency].map((tier) => {
                        const isSelected = selectedType === tier.id;
                        return (
                          <button
                            type="button"
                            key={tier.id}
                            onClick={() => setSelectedType(tier.id)}
                            className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 shadow-sm ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                                : 'border-slate-200/80 bg-white/80 hover:bg-white hover:border-blue-300'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold text-blue-600 uppercase">{tier.duration}</span>
                                <span className="text-xs font-extrabold text-slate-900 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200/50">
                                  {tier.price}
                                </span>
                              </div>
                              <h4 className="font-bold text-sm text-slate-900 mt-3">{tier.title}</h4>
                              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{tier.desc}</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-slate-900">
                              {isSelected ? (
                                <span className="text-blue-600 flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" /> Selected Format
                                </span>
                              ) : (
                                <span className="text-slate-400 hover:text-slate-900">Select Plan</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Date and Time Slot Selection */}
                  <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4 shadow-sm">
                    <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                      2. Schedule Preference *
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 shadow-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Preferred Time Window (EAT) *
                        </label>
                        <select
                          value={formData.preferredTimeSlot}
                          onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                          className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 shadow-sm transition-all"
                        >
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Attendee Details */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                      3. Attendee & Company Info
                    </h3>

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
                          placeholder="Valary Femy"
                          className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 shadow-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.workEmail}
                          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                          placeholder="valary@company.com"
                          className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 shadow-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Organization Name
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
                          Phone Number / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0799 985842"
                          className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 shadow-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Key Discussion Topics & Core Objective *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.discussionTopics}
                        onChange={(e) => setFormData({ ...formData, discussionTopics: e.target.value })}
                        placeholder="Briefly outline what you wish to cover (e.g., system modernization, AI workflow implementation, security audit requirements)..."
                        className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-900 shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                      <span>An error occurred while booking your session. Please email info@mavoratechnologies.com directly.</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3 border-0 flex items-center justify-center gap-2 rounded-xl"
                  >
                    {status === 'submitting' ? (
                      'Booking Session...'
                    ) : (
                      <>
                        Confirm Consultation Request <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar Details Panel (Dark Card & Glass Info Box) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none" />

                <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider relative z-10 border-b border-slate-800 pb-4">
                  <UserCheck className="h-4 w-4" />
                  <span>What to Expect</span>
                </div>

                <div className="space-y-5 text-xs text-slate-300 leading-relaxed relative z-10">
                  <div className="flex items-start gap-3">
                    <Video className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Google Meet / Teams Link</strong>
                      A calendar invitation with video conference coordinates will be sent automatically.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Direct Lead Engineer Access</strong>
                      You will speak directly with a Senior Architect, not a sales representative.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Confidentiality Assured</strong>
                      All technical specifications discussed are protected under default mutual non-disclosure.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Office Info Card */}
              <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/80 backdrop-blur-md text-xs text-slate-600 space-y-3 shadow-sm">
                <h4 className="font-bold text-slate-900 text-sm">Direct Desk Contacts</h4>
                
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Wood Garden Road, off Wood Avenue, Kilimani, Nairobi</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                    <a href="mailto:info@mavoratechnologies.com" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                      info@mavoratechnologies.com
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                    <a href="tel:0799985842" className="font-bold text-slate-900 hover:text-blue-600">
                      0799 985842
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}