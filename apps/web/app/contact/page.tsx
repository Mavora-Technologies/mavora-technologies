'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Coins,
  MessageSquare,
  Building2,
  Sparkles
} from 'lucide-react';

type Currency = 'USD' | 'KES';

const INQUIRY_TYPES = [
  'General Inquiry',
  'Software Engineering & Custom Builds',
  'AI & Automation Solutions',
  'Cybersecurity & Audits',
  'Cloud Infrastructure & DevOps',
  'Partnerships / Advisory',
];

const BUDGET_RANGES: Record<Currency, { id: string; label: string }[]> = {
  USD: [
    { id: '10k-25k', label: '$10,000 – $25,000' },
    { id: '25k-50k', label: '$25,000 – $50,000' },
    { id: '50k-100k', label: '$50,000 – $100,000' },
    { id: '100k-plus', label: '$100,000+' },
  ],
  KES: [
    { id: '1.3m-3.25m', label: 'KES 1,300,000 – KES 3,250,000' },
    { id: '3.25m-6.5m', label: 'KES 3,250,000 – KES 6,500,000' },
    { id: '6.5m-13m', label: 'KES 6,500,000 – KES 13,000,000' },
    { id: '13m-plus', label: 'KES 13,000,000+' },
  ],
};

export default function ContactPage() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    inquiryType: INQUIRY_TYPES[0],
    currency: 'USD' as Currency,
    budget: '25k-50k',
    message: '',
  });

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    const defaultBudget = BUDGET_RANGES[newCurrency][1].id;
    setFormData((prev) => ({
      ...prev,
      currency: newCurrency,
      budget: defaultBudget,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
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
    <div className="min-h-screen bg-mavora-light">
      {/* Hero Section */}
      <section className="bg-mavora-navy text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1769FF_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="teal">Contact Engineering Desk</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-4">
              Get in Touch with Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-mavora-teal to-blue-400">Technical Team.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Have a project inquiry, architecture question, or enterprise consulting request? Connect directly with our team in Nairobi or schedule a virtual discovery call.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-mavora-navy tracking-tight">Direct Information</h2>
                <p className="text-xs text-slate-500 mt-1">Reach out directly via email, telephone, or visit our office.</p>
              </div>

              {/* Information Cards */}
              <div className="space-y-4">
                
                {/* Office Address */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-mavora-navy text-mavora-teal flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">HQ Address</span>
                    <strong className="text-sm font-bold text-mavora-navy block">Mavora Technologies Ltd</strong>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      Wood Garden Road, off Wood Avenue, Kilimani
                    </span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-mavora-navy text-mavora-teal flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Us</span>
                    <a 
                      href="mailto:info@mavoratechnologies.com" 
                      className="text-sm font-bold text-mavora-blue hover:underline block"
                    >
                      info@mavoratechnologies.com
                    </a>
                    <span className="text-slate-500 block mt-0.5">Primary channel for technical RFPs & briefs</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-mavora-navy text-mavora-teal flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone / Call Desk</span>
                    <a 
                      href="tel:0799985842" 
                      className="text-sm font-bold text-mavora-navy hover:text-mavora-blue transition-colors block"
                    >
                      0799 985842
                    </a>
                    <span className="text-slate-500 block mt-0.5">Available Monday – Friday (8:30 AM – 5:00 PM EAT)</span>
                  </div>
                </div>

              </div>

              {/* SLA Banner */}
              <div className="p-6 rounded-2xl bg-mavora-navy text-white space-y-4 shadow-md">
                <div className="flex items-center gap-2 text-mavora-teal font-mono text-xs uppercase tracking-wider">
                  <Clock className="h-4 w-4" />
                  <span>Response SLA Guarantee</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All enterprise inquiries and scope briefing submissions are reviewed directly by our technical leads. You will receive an initial feedback report within <strong className="text-white">24 business hours</strong>.
                </p>
              </div>
            </div>

            {/* Inquiry Form Column */}
            <div className="lg:col-span-7">
              
              {status === 'success' ? (
                <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-mavora-navy text-mavora-teal flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-mavora-navy">Message Received</h3>
                    <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
                      Thank you for reaching out to Mavora Technologies. We have logged your request ({formData.currency} Tier) and sent a confirmation receipt to <strong className="text-mavora-navy">{formData.workEmail}</strong>.
                    </p>
                  </div>
                  <Button href="/" variant="outline" size="md">
                    Return to Home
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
                  
                  <div>
                    <h3 className="text-xl font-bold text-mavora-navy">Send us a Message</h3>
                    <p className="text-xs text-slate-500 mt-1">Fill out the parameters below to route your inquiry to the correct engineering team.</p>
                  </div>

                  {/* Name & Work Email */}
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
                        className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
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
                        placeholder="valary@company.com"
                        className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
                      />
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Organization / Business Name
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
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0799 000 000"
                        className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Inquiry Subject / Domain
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
                    >
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Multi-Currency Budget Tier Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                        Estimated Budget Range
                      </label>

                      {/* Currency Switcher Toggle */}
                      <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
                        <button
                          type="button"
                          onClick={() => handleCurrencyChange('USD')}
                          className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${
                            currency === 'USD'
                              ? 'bg-mavora-navy text-white shadow-sm'
                              : 'text-slate-600 hover:text-mavora-navy'
                          }`}
                        >
                          <Coins className="w-3 h-3" /> USD ($)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCurrencyChange('KES')}
                          className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${
                            currency === 'KES'
                              ? 'bg-mavora-navy text-white shadow-sm'
                              : 'text-slate-600 hover:text-mavora-navy'
                          }`}
                        >
                          <Coins className="w-3 h-3" /> KES (KSh)
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {BUDGET_RANGES[currency].map((b) => (
                        <button
                          type="button"
                          key={b.id}
                          onClick={() => setFormData({ ...formData, budget: b.id })}
                          className={`p-3 rounded-lg border text-left text-xs font-bold transition-all ${
                            formData.budget === b.id
                              ? 'border-mavora-blue bg-blue-50/50 text-mavora-navy ring-1 ring-mavora-blue'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Project Description or Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements, project timeline, or specific technical challenges..."
                      className="w-full px-4 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy bg-white"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                      <span>An error occurred while transmitting your message. Please try again or email info@mavoratechnologies.com directly.</span>
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
                      'Transmitting...'
                    ) : (
                      <>
                        Send Message <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}