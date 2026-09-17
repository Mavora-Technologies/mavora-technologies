import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  FileText, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-hidden">
      
      {/* Sticky Glass Navigation Bar */}
      <div className="border-b border-slate-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Legal & Compliance
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative bg-[#EBF3FF] text-slate-900 py-16 lg:py-24 overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md mb-4">
              <Scale className="w-3.5 h-3.5 text-teal-700" /> Terms & Conditions
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-2 text-slate-900">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">Service.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Review the legal framework, rights, and responsibilities governing your use of Mavora Technologies Ltd. software engineering platforms and advisory services.
            </p>
            <p className="mt-4 text-xs font-mono text-slate-500">
              Last updated: <span className="text-slate-800 font-semibold">January 2026</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 lg:py-20 relative bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Policy Sections */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Section 01 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    01
                  </span>
                  Agreement to Terms
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and <strong className="text-slate-900">Mavora Technologies Ltd.</strong> (“we,” “our,” or “us”), concerning your access to and use of our website as well as any associated software development, AI automation pipelines, cloud architecture, and zero-trust cybersecurity services.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  By accessing or using our services, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms of Service. If you do not agree with all these terms, you are expressly prohibited from using our services.
                </p>
              </div>

              {/* Section 02 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    02
                  </span>
                  Intellectual Property Rights
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Unless otherwise indicated, the website, source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the platform (collectively, the “Content”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Content is provided on the website <span className="italic font-semibold text-slate-900">“AS IS”</span> for your internal business or informational use only. Except as expressly provided in these Terms of Service, no part of the platform or content may be copied, reproduced, aggregated, republished, uploaded, posted, or distributed without our explicit written permission.
                </p>
              </div>

              {/* Section 03 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    03
                  </span>
                  Services & Deliverables
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Mavora Technologies provides professional enterprise engineering services. Specific project terms, timelines, deliverables, scope, and payment schedules are governed by separate Master Services Agreements (MSAs) or specific Statements of Work (SOWs) executed between Mavora Technologies and the client. In the event of any conflict between these Terms of Service and a signed SOW, the SOW shall prevail regarding those specific deliverables.
                </p>
              </div>

              {/* Section 04 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    04
                  </span>
                  Prohibited Activities
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  You may not access or use the platform for any purpose other than that for which we make it available. Prohibited activities include:
                </p>
                <ul className="space-y-3 text-slate-600 text-sm sm:text-base">
                  <li className="flex items-start gap-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      Systematically retrieving data or content from the site to create or compile a collection or database without explicit written permission.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      Circumventing, disabling, or otherwise interfering with security-related features or authentication protocols of the platform.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      Engaging in unauthorized framing, scraping, or deep-linking to any portion of the platform infrastructure.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      Using the platform or our cloud infrastructure to transmit malicious code, malware, or launch automated denial-of-service attacks.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Section 05 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    05
                  </span>
                  Limitation of Liability
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  In no event will Mavora Technologies or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the platform or our professional services, even if we have been advised of the possibility of such damages.
                </p>
              </div>

              {/* Section 06 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    06
                  </span>
                  Governing Law
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  These terms shall be governed by and defined following the laws of Kenya. Mavora Technologies Ltd. and yourself irrevocably consent that the courts of Kenya shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                </p>
              </div>

              {/* Section 07 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    07
                  </span>
                  Contact Information
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  If you have any questions regarding these Terms of Service, please contact our legal and support team:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-slate-900 block mb-1 font-semibold">Headquarters</strong>
                      <span className="text-slate-600">Wood Garden Road, off Wood Avenue, Kilimani, Nairobi</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <a href="mailto:info@mavoratechnologies.com" className="text-xs text-slate-900 hover:text-blue-600 font-bold transition-colors">
                        info@mavoratechnologies.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                      <a href="tel:0799985842" className="text-xs text-slate-900 hover:text-blue-600 font-bold transition-colors">
                        0799 985842
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar Governance & SLA Panel */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none" />

                <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider relative z-10 border-b border-slate-800 pb-4">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Enterprise Governance</span>
                </div>

                <div className="space-y-5 text-xs text-slate-300 leading-relaxed relative z-10">
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Master Services Agreement</strong>
                      Enterprise engagements are additionally protected under custom signed MSAs and Statements of Work (SOWs).
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Clear Deliverables</strong>
                      All project scope boundaries, milestones, and acceptance criteria are explicitly documented prior to kick-off.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Jurisdiction & Compliance</strong>
                      Fully compliant with Kenyan law and international enterprise service standards.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Legal Contact Info Card */}
              <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/80 backdrop-blur-md text-xs text-slate-600 space-y-3 shadow-sm">
                <h4 className="font-bold text-slate-900 text-sm">Legal & Contracts Desk</h4>
                <p className="leading-relaxed">Require vendor onboarding documentation, customized SOW templates, or MSA review?</p>
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