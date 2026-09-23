'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { fetchApi } from '@/lib/api'; // 1. Import our centralized API client
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare,
  Building2,
  Sparkles
} from 'lucide-react';

const INQUIRY_TYPES = [
  'General Inquiry',
  'Software Engineering & Custom Builds',
  'AI & Automation Solutions',
  'Cybersecurity & Audits',
  'Cloud Infrastructure & DevOps',
  'Partnerships / Advisory',
];

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    inquiryType: INQUIRY_TYPES[0],
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // 2. Map frontend fields to match backend schema requirements
    const payload = {
      fullName: formData.fullName,
      email: formData.workEmail,
      company: formData.companyName,
      phone: formData.phone,
      service: formData.inquiryType,
      message: formData.message,
      source: 'Website Contact Form',
    };

    try {
      // 3. Send request directly to your Express backend /api/leads endpoint
      const res = await fetchApi('/leads', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (res.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative bg-[#EBF3FF] text-slate-900 py-10 sm:py-14 lg:py-20 overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" /> 
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">             
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
                Contact Engineering Desk
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
                Get in Touch with Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">Technical Team.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Have a project inquiry, architecture question, or enterprise consulting request? Connect directly with our team in Nairobi or schedule a virtual discovery call.
              </p>
            </div>
      
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80" 
                  alt="Mavora Technologies modern office workspace" 
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wide bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
                    <Building2 className="w-4 h-4 text-teal-400" />
                    <span>Kilimani, Nairobi HQ</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300">
                    24h Response SLA
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-14 lg:py-20 relative bg-white/40">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Direct Information</h2>
                <p className="text-xs text-slate-600 mt-1">Reach out directly via email, telephone, or visit our office.</p>
              </div>  
              <div className="space-y-4">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-start gap-4 hover:border-blue-300 transition-all duration-300">  
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1 text-[10px]">HQ Address</span>
                    <strong className="text-sm font-bold text-slate-900 block">Mavora Technologies Ltd</strong>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      Wood Garden Road, off Wood Avenue, Kilimani
                    </span>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-start gap-4 hover:border-blue-300 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1 text-[10px]">Email Us</span>
                    <a href="mailto:info@mavoratechnologies.com" className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline block">
                      info@mavoratechnologies.com
                    </a>
                    <span className="text-slate-500 block mt-0.5">Primary channel for technical RFPs & briefs</span>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-start gap-4 hover:border-blue-300 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1 text-[10px]">Phone / Call Desk</span>
                    <a href="tel:+254795707823" className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors block">
                      +254 (0) 795 707 823
                    </a>
                    <span className="text-slate-500 block mt-0.5">Available Monday – Friday (8:30 AM – 5:00 PM EAT)</span>
                  </div>
                </div>
              </div>    

              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none" />
                <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider relative z-10">
                  <Clock className="h-4 w-4" />
                  <span>Response SLA Guarantee</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed relative z-10">
                  All enterprise inquiries and scope briefing submissions are reviewed directly by our technical leads. You will receive an initial feedback report within <strong className="text-white font-bold">24 business hours</strong>.
                </p>
              </div>
            </div>

            {/* Inquiry Form Column */}
            <div className="lg:col-span-7">   
              {status === 'success' ? (
                <div className="p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/80 text-center space-y-6 shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Message Received</h3>
                    <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto leading-relaxed">
                      Thank you for reaching out to Mavora Technologies. We have logged your request and sent a confirmation receipt to <strong className="text-slate-900">{formData.workEmail}</strong>.
                    </p>
                  </div>
                  <Button 
                    href="/" 
                    variant="ghost" 
                    size="md"
                    className="border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-sm rounded-xl px-6"
                  >
                    Return to Home
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-md space-y-6 shadow-sm">
                  <div>   
                    <h3 className="text-xl font-bold text-slate-900">Send us a Message</h3>
                    <p className="text-xs text-slate-500 mt-1">Fill out the parameters below to route your inquiry to the correct engineering team.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Valary Femy"
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300/80 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Corporate Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="valary@company.com"
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300/80 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Organization / Business Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Enterprise Inc."
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300/80 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0799 000 000"
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300/80 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Inquiry Subject / Domain
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300/80 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                    >
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Project Description or Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements, project timeline, or specific technical challenges..."
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300/80 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                      <span>An error occurred while transmitting your message. Please try again or email info@mavoratechnologies.com directly.</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3.5 border-0 rounded-xl transition-all duration-200"
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