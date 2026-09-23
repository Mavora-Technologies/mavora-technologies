'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import {
  Video,
  CheckCircle2,
  AlertCircle,
  Send,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  UserCheck,
  ArrowUpRight,
} from 'lucide-react';

const CONSULTATION_TYPES = [
  {
    id: 'discovery',
    title: 'Initial Discovery Call',
    duration: '30 Minutes',
    desc: 'High-level project scope review, technical feasibility, and team alignment.',
  },
  {
    id: 'architecture-review',
    title: 'Deep Architecture Workshop',
    duration: 'Half-Day Session',
    desc: 'Comprehensive review of your codebase, cloud setup, and security posture with a Lead Architect.',
  },
  {
    id: 'cto-advisory',
    title: 'Fractional CTO / Advisory',
    duration: 'Monthly Retainer',
    desc: 'Ongoing strategic tech leadership, vendor evaluations, and quarterly security audits.',
  },
];

const TIME_SLOTS = [
  'Morning (09:00 AM - 12:00 PM EAT)',
  'Afternoon (01:00 PM - 04:00 PM EAT)',
  'Evening (04:00 PM - 06:00 PM EAT)',
];

export default function RequestConsultationPage() {
  const [selectedType, setSelectedType] = useState('discovery');

  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    preferredDate: '',
    preferredTimeSlot: TIME_SLOTS[0],
    consultationType: 'discovery',
    discussionTopics: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Direct connection to Express backend on port 5000 (bypassing Next.js proxy 404)
      const response = await fetch('http://localhost:5000/api/consultation/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          consultationType: selectedType,
        }),
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
    <main className="min-h-screen w-full overflow-x-hidden bg-[#EBF3FF] text-slate-900">
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative w-full overflow-hidden border-b border-slate-200/80">
        {/* Background */}
        <div className="absolute inset-0 bg-[#EBF3FF]" />

        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(#2563EB_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-blue-400/20 blur-[120px]" />

        <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-teal-400/15 blur-[130px]" />

        {/* Hero container */}
        <div className="relative z-10 mx-auto w-full max-w-[2400px] px-4 py-5 sm:px-6 sm:py-7 md:px-8 lg:px-10 lg:py-8 xl:px-16 2xl:px-24">
          <div className="grid min-w-0 grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10 xl:gap-16">
            {/* LEFT */}
            <div className="min-w-0 lg:col-span-7">
              <div className="max-w-5xl">
                {/* Badge */}
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-800 shadow-sm backdrop-blur-md sm:text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                  Expert Advisory
                </div>

                {/* Heading */}
                <h1 className="text-[clamp(2.1rem,4.5vw,5.5rem)] font-black leading-[0.98] tracking-[-0.045em] text-slate-900">
                  Book a Strategy &{' '}
                  <span className="bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700 bg-clip-text text-transparent">
                    Architecture Session.
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base lg:text-lg lg:leading-7">
                  Schedule a focused 1-on-1 consultation with our Lead Solution
                  Architects to evaluate technical feasibility, system design,
                  or enterprise modernization strategies.
                </p>

                {/* Hero points */}
                <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                  <div className="rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-[10px] font-semibold text-slate-700 shadow-sm sm:text-xs">
                    Technical Strategy
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-[10px] font-semibold text-slate-700 shadow-sm sm:text-xs">
                    Architecture Review
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-[10px] font-semibold text-slate-700 shadow-sm sm:text-xs">
                    Enterprise Advisory
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — LARGE TECHNOLOGY VISUAL */}
            <div className="min-w-0 lg:col-span-5">
              <div className="group relative h-[210px] w-full overflow-hidden rounded-2xl border border-white/70 bg-slate-900 shadow-2xl sm:h-[270px] md:h-[310px] lg:h-[330px] xl:h-[370px]">
                <Image
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85"
                  alt="Modern technology hardware and digital architecture"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/10 via-transparent to-slate-950/80" />

                {/* Floating technology panel */}
                <div className="absolute right-3 top-3 rounded-xl border border-white/20 bg-slate-950/60 px-3 py-2 backdrop-blur-md sm:right-5 sm:top-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.8)]" />

                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white">
                      Architecture
                    </span>
                  </div>
                </div>

                {/* Bottom text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-teal-300 sm:text-[10px]">
                    Technology Advisory
                  </span>

                  <p className="mt-1 max-w-md text-xs font-semibold leading-5 text-white sm:text-sm">
                    Practical technology strategy engineered around your
                    business objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <section className="relative w-full bg-white/50">
        <div className="mx-auto w-full max-w-[2400px] px-4 py-5 sm:px-6 sm:py-7 md:px-8 lg:px-10 lg:py-9 xl:px-16 2xl:px-24">
          <div className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
            {/* ======================================================
                FORM
            ====================================================== */}
            <div className="min-w-0 lg:col-span-8">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-7 lg:p-8 xl:p-9">
                {status === 'success' ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:p-10">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-teal-400 shadow-md">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
                      Consultation Request Confirmed
                    </h3>

                    <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
                      We have logged your booking request. An invitation
                      calendar link will be dispatched to{' '}
                      <strong className="text-slate-900">
                        {formData.workEmail}
                      </strong>{' '}
                      within 12 business hours.
                    </p>

                    <div className="mt-6">
                      <Button
                        href="/"
                        variant="outline"
                        size="md"
                        className="border-slate-300 bg-white hover:bg-slate-50"
                      >
                        Return to Home
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6 sm:space-y-7"
                  >
                    {/* ==================================================
                        STEP 1
                    ================================================== */}
                    <section>
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                            1. Select Consultation Format *
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            Choose the engagement depth that aligns with your
                            current roadmap.
                          </p>
                        </div>
                      </div>

                      {/* Consultation plans */}
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {CONSULTATION_TYPES.map((tier) => {
                          const isSelected = selectedType === tier.id;

                          return (
                            <button
                              type="button"
                              key={tier.id}
                              onClick={() => setSelectedType(tier.id)}
                              className={`group flex min-w-0 flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600/10'
                                  : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30'
                              }`}
                            >
                              <div>
                                <div className="flex items-start justify-between gap-2">
                                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 sm:text-[10px]">
                                    {tier.duration}
                                  </span>
                                </div>

                                <h4 className="mt-3 text-sm font-bold text-slate-900">
                                  {tier.title}
                                </h4>

                                <p className="mt-2 text-xs leading-5 text-slate-500">
                                  {tier.desc}
                                </p>
                              </div>

                              <div className="mt-4 border-t border-slate-100 pt-3">
                                {isSelected ? (
                                  <span className="flex items-center gap-1 text-xs font-bold text-blue-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Selected Format
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-slate-900">
                                    Select Plan
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    {/* ==================================================
                        STEP 2
                    ================================================== */}
                    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                        2. Schedule Preference *
                      </h3>

                      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="min-w-0">
                          <label className="mb-1 block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 sm:text-xs">
                            Preferred Date *
                          </label>

                          <input
                            type="date"
                            required
                            value={formData.preferredDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                preferredDate: e.target.value,
                              })
                            }
                            className="block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 sm:px-4"
                          />
                        </div>

                        <div className="min-w-0">
                          <label className="mb-1 block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 sm:text-xs">
                            Preferred Time Window (EAT) *
                          </label>

                          <select
                            value={formData.preferredTimeSlot}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                preferredTimeSlot: e.target.value,
                              })
                            }
                            className="block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 sm:px-4"
                          >
                            {TIME_SLOTS.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </section>

                    {/* ==================================================
                        STEP 3
                    ================================================== */}
                    <section>
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                        3. Attendee & Company Info
                      </h3>

                      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="min-w-0">
                          <label className="mb-1 block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 sm:text-xs">
                            Full Name *
                          </label>

                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                fullName: e.target.value,
                              })
                            }
                            placeholder="Valary Femy"
                            className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 sm:px-4"
                          />
                        </div>

                        <div className="min-w-0">
                          <label className="mb-1 block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 sm:text-xs">
                            Corporate Email *
                          </label>

                          <input
                            type="email"
                            required
                            value={formData.workEmail}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                workEmail: e.target.value,
                              })
                            }
                            placeholder="valary@company.com"
                            className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 sm:px-4"
                          />
                        </div>

                        <div className="min-w-0">
                          <label className="mb-1 block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 sm:text-xs">
                            Organization Name
                          </label>

                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                companyName: e.target.value,
                              })
                            }
                            placeholder="Enterprise Inc."
                            className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 sm:px-4"
                          />
                        </div>

                        <div className="min-w-0">
                          <label className="mb-1 block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 sm:text-xs">
                            Phone Number / WhatsApp
                          </label>

                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            placeholder="0799 985842"
                            className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 sm:px-4"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="mb-1 block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 sm:text-xs">
                          Key Discussion Topics & Core Objective *
                        </label>

                        <textarea
                          required
                          rows={4}
                          value={formData.discussionTopics}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              discussionTopics: e.target.value,
                            })
                          }
                          placeholder="Briefly outline what you wish to cover (e.g., system modernization, AI workflow implementation, security audit requirements)..."
                          className="w-full min-w-0 resize-y rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs leading-5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 sm:px-4"
                        />
                      </div>
                    </section>

                    {/* Error */}
                    {status === 'error' && (
                      <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />

                        <span>
                          An error occurred while booking your session. Please
                          email info@mavoratechnologies.com directly.
                        </span>
                      </div>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === 'submitting'}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border-0 bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
                    >
                      {status === 'submitting' ? (
                        'Booking Session...'
                      ) : (
                        <>
                          Confirm Consultation Request
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* ======================================================
                SIDEBAR
            ====================================================== */}
            <aside className="min-w-0 space-y-5 lg:col-span-4">
              {/* Large Technology Image */}
              <div className="group relative h-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-xl sm:h-[260px] lg:h-[300px] xl:h-[330px]">
                <Image
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85"
                  alt="Cloud infrastructure and modern server technology"
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-teal-400 sm:text-[10px]">
                    Secure Infrastructure
                  </span>

                  <p className="mt-1 text-xs font-semibold leading-5 text-white sm:text-sm">
                    Enterprise-grade architecture review, cloud strategy and
                    technical auditing.
                  </p>
                </div>
              </div>

              {/* What To Expect */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5 text-white shadow-xl sm:rounded-3xl sm:p-6 lg:p-7">
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-[60px]" />

                <div className="relative z-10 flex items-center gap-2 border-b border-slate-800 pb-4 font-mono text-xs font-bold uppercase tracking-wider text-teal-400">
                  <UserCheck className="h-4 w-4" />
                  What to Expect
                </div>

                <div className="relative z-10 mt-5 space-y-5 text-xs leading-5 text-slate-300">
                  <div className="flex items-start gap-3">
                    <Video className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />

                    <div className="min-w-0">
                      <strong className="mb-0.5 block text-white">
                        Google Meet / Teams Link
                      </strong>

                      <span>
                        A calendar invitation with video conference coordinates
                        will be sent automatically.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />

                    <div className="min-w-0">
                      <strong className="mb-0.5 block text-white">
                        Direct Lead Engineer Access
                      </strong>

                      <span>
                        You will speak directly with a Senior Architect, not a
                        sales representative.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />

                    <div className="min-w-0">
                      <strong className="mb-0.5 block text-white">
                        Confidentiality Assured
                      </strong>

                      <span>
                        All technical specifications discussed are protected
                        under default mutual non-disclosure.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 shadow-sm sm:rounded-3xl sm:p-6">
                <h4 className="text-sm font-bold text-slate-900">
                  Direct Desk Contacts
                </h4>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                    <span className="leading-5">
                      Wood Garden Road, off Wood Avenue, Kilimani, Nairobi
                    </span>
                  </div>

                  <div className="flex min-w-0 items-start gap-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                    <a
                      href="mailto:info@mavoratechnologies.com"
                      className="min-w-0 break-all font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      info@mavoratechnologies.com
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 shrink-0 text-blue-600" />

                    <a
                      href="tel:0799985842"
                      className="font-bold text-slate-900 hover:text-blue-600"
                    >
                      0799 985842
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}