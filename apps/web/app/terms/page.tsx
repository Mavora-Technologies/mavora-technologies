import React from 'react';
import Link from 'next/link';
import { Scale, FileText, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-mavora-navy text-slate-300 selection:bg-mavora-teal selection:text-slate-950">
      
      {/* Top Header Navigation Bar */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-mavora-teal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Legal & Compliance</span>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Title Header */}
        <div className="space-y-4 mb-12 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mavora-teal/10 text-mavora-teal text-xs font-semibold tracking-wide uppercase border border-mavora-teal/20">
            <Scale className="w-3.5 h-3.5" /> Terms & Conditions
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: <span className="text-slate-200 font-medium">January 2026</span>
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">01</span>
              Agreement to Terms
            </h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and <strong className="text-white">Mavora Technologies Ltd.</strong> (“we,” “our,” or “us”), concerning your access to and use of our website as well as any associated software development, AI automation pipelines, cloud architecture, and zero-trust cybersecurity services.
            </p>
            <p>
              By accessing or using our services, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms of Service. If you do not agree with all these terms, you are expressly prohibited from using our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">02</span>
              Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise indicated, the website, source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the platform (collectively, the “Content”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
            <p>
              Content is provided on the website <span className="italic">“AS IS”</span> for your internal business or informational use only. Except as expressly provided in these Terms of Service, no part of the platform or content may be copied, reproduced, aggregated, republished, uploaded, posted, or distributed without our explicit written permission.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">03</span>
              Services & Deliverables
            </h2>
            <p>
              Mavora Technologies provides professional enterprise engineering services. Specific project terms, timelines, deliverables, scope, and payment schedules are governed by separate master services agreements (MSAs) or specific Statements of Work (SOWs) executed between Mavora Technologies and the client. In the event of any conflict between these Terms of Service and a signed SOW, the SOW shall prevail regarding those specific deliverables.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">04</span>
              Prohibited Activities
            </h2>
            <p>You may not access or use the platform for any purpose other than that for which we make it available. Prohibited activities include:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>Systematically retrieving data or content from the site to create or compile a collection or database without written permission.</li>
              <li>Circumventing, disabling, or otherwise interfering with security-related features of the platform.</li>
              <li>Engaging in unauthorized framing of or linking to the website.</li>
              <li>Using the platform or our infrastructure to transmit malicious code, malware, or launch automated denial-of-service attacks.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">05</span>
              Limitation of Liability
            </h2>
            <p>
              In no event will Mavora Technologies or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the platform or our professional services, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          {/* Section 6: Governing Law */}
          <section className="space-y-3 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">06</span>
              Governing Law
            </h2>
            <p>
              These terms shall be governed by and defined following the laws of Kenya. Mavora Technologies Ltd. and yourself irrevocably consent that the courts of Kenya shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </section>

          {/* Section 7: Contact Us */}
          <section className="space-y-4 bg-gradient-to-br from-slate-900 to-slate-900/80 p-6 sm:p-8 rounded-2xl border border-mavora-teal/20">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">07</span>
              Contact Information
            </h2>
            <p>
              If you have any questions regarding these Terms of Service, please contact our legal and support team:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <MapPin className="w-5 h-5 text-mavora-teal shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block mb-1">Headquarters</strong>
                  <span className="text-slate-400">Wood Garden Road, off Wood Avenue, Kilimani, Nairobi</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-mavora-teal shrink-0" />
                  <a href="mailto:info@mavoratechnologies.com" className="text-xs text-slate-300 hover:text-white transition-colors">
                    info@mavoratechnologies.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-mavora-teal shrink-0" />
                  <a href="tel:0799985842" className="text-xs text-slate-300 hover:text-white transition-colors">
                    0799 985842
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>

      </main>
    </div>
  );
}