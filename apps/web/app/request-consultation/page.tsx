'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Calendar, 
  Clock, 
  Coins, 
  Video, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ShieldCheck, 
  ArrowRight,
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
    <div className="min-h-screen bg-mavora-light">
      {/* Hero Header */}
      <section className="bg-mavora-navy text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1769FF_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="teal">Expert Advisory</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-4">
              Book a Strategy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-mavora-teal to-blue-400">Architecture Session.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Schedule a focused 1-on-1 consultation with our Lead Solution Architects to evaluate technical feasibility, system design, or enterprise modernization strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Consultation Form Column */}
            <div className="lg:col-span-8">
              
              {status === 'success' ? (
                <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-mavora-navy text-mavora-teal flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-mavora-navy">Consultation Request Confirmed</h3>
                    <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
                      We have logged your booking request. An invitation calendar link will be dispatched to <strong className="text-mavora-navy">{formData.workEmail}</strong> within 12 business hours.
                    </p>
                  </div>
                  <Button href="/" variant="outline" size="md">
                    Return to Home
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Step 1: Select Consultation Tier with Currency Toggle */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-mavora-navy">1. Select Consultation Format</h3>
                        <p className="text-xs text-slate-500">Choose the engagement depth that aligns with your current roadmap.</p>
                      </div>

                      {/* Currency Toggle */}
                      <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
                        <button
                          type="button"
                          onClick={() => handleCurrencyChange('USD')}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                            currency === 'USD'
                              ? 'bg-mavora-navy text-white shadow-sm'
                              : 'text-slate-600 hover:text-mavora-navy'
                          }`}
                        >
                          <Coins className="w-3.5 h-3.5" /> USD ($)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCurrencyChange('KES')}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                            currency === 'KES'
                              ? 'bg-mavora-navy text-white shadow-sm'
                              : 'text-slate-600 hover:text-mavora-navy'
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
                            className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                              isSelected
                                ? 'border-mavora-blue bg-blue-50/40 ring-2 ring-mavora-blue/20'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold text-mavora-blue uppercase">{tier.duration}</span>
                                <span className="text-xs font-extrabold text-mavora-navy bg-slate-100 px-2 py-0.5 rounded">
                                  {tier.price}
                                </span>
                              </div>
                              <h4 className="font-bold text-sm text-mavora-navy mt-2">{tier.title}</h4>
                              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{tier.desc}</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-mavora-navy">
                              {isSelected ? (
                                <span className="text-mavora-blue flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" /> Selected Format
                                </span>
                              ) : (
                                <span className="text-slate-400 group-hover:text-mavora-navy">Select Plan</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Date and Time Slot Selection */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="text-sm font-mono font-bold text-mavora-navy uppercase tracking-wider">
                      2. Schedule Preference
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Preferred Date *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            value={formData.preferredDate}
                            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                            className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Preferred Time Window (EAT) *
                        </label>
                        <select
                          value={formData.preferredTimeSlot}
                          onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
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
                    <h3 className="text-sm font-mono font-bold text-mavora-navy uppercase tracking-wider">
                      3. Attendee & Company Info
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Valary Femy"
                          className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.workEmail}
                          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                          placeholder="valary@company.com"
                          className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="Enterprise Inc."
                          className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone Number / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0799 985842"
                          className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Key Discussion Topics & Core Objective *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.discussionTopics}
                        onChange={(e) => setFormData({ ...formData, discussionTopics: e.target.value })}
                        placeholder="Briefly outline what you wish to cover (e.g., system modernization, AI workflow implementation, security audit requirements)..."
                        className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                      <span>An error occurred while booking your session. Please email info@mavoratechnologies.com directly.</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2"
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

            {/* Sidebar Details Panel */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-mavora-navy text-white p-6 rounded-2xl border border-slate-800 space-y-6 shadow-lg">
                <div className="flex items-center gap-2 text-mavora-teal font-mono text-xs uppercase tracking-wider">
                  <UserCheck className="h-4 w-4" />
                  <span>What to Expect</span>
                </div>

                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <Video className="w-4 h-4 text-mavora-teal shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Google Meet / Teams Link</strong>
                      A calendar invitation with video conference coordinates will be sent automatically.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-mavora-teal shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Direct Lead Engineer Access</strong>
                      You will speak directly with a Senior Architect, not a sales representative.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-mavora-teal shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Confidentiality Assured</strong>
                      All technical specifications discussed are protected under default mutual non-disclosure.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Office Info Card */}
              <div className="p-6 rounded-2xl bg-mavora-light border border-slate-200 text-xs text-slate-600 space-y-4">
                <h4 className="font-bold text-mavora-navy text-sm">Direct Desk Contacts</h4>
                
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-mavora-blue shrink-0 mt-0.5" />
                    <span>Wood Garden Road, off Wood Avenue, Kilimani, Nairobi</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-mavora-blue shrink-0" />
                    <a href="mailto:info@mavoratechnologies.com" className="font-bold text-mavora-blue hover:underline">
                      info@mavoratechnologies.com
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-mavora-blue shrink-0" />
                    <a href="tel:0799985842" className="font-bold text-mavora-navy hover:text-mavora-blue">
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