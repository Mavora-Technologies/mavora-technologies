import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <Shield className="w-3.5 h-3.5" /> Data Protection & Trust
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Privacy Policy
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
              Introduction
            </h2>
            <p>
              At <strong className="text-white">Mavora Technologies Ltd.</strong> (“we,” “our,” or “us”), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, engage our custom software development, AI automation, cloud architecture, or cybersecurity services, or otherwise interact with us.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access or use our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">02</span>
              Information We Collect
            </h2>
            <p>We may collect information about you in a variety of ways, including:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Personal Data:</strong> Personally identifiable information, such as your name, corporate email address, telephone number, and company name, that you voluntarily provide when filling out contact forms, requesting project proposals, or booking advisory sessions.
              </li>
              <li>
                <strong className="text-white">Derivative Data:</strong> Information automatically collected by our servers when you access our platform, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing our site.
              </li>
              <li>
                <strong className="text-white">Project & Technical Data:</strong> Information shared during enterprise software scoping, cloud system evaluations, or security audits necessary for fulfilling our contractual obligations.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">03</span>
              How We Use Your Information
            </h2>
            <p>Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we use information collected to:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>Fulfill and manage project requests, software builds, and technical consultations.</li>
              <li>Send administrative information to you, such as project updates, invoices, terms changes, and security alerts.</li>
              <li>Respond to customer service inquiries and support technical infrastructure operations.</li>
              <li>Improve platform functionality, website performance, and user experience through analytical insights.</li>
              <li>Comply with applicable legal requirements, industry standards, and regulatory frameworks.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">04</span>
              Data Security & Protection
            </h2>
            <p>
              As a provider of enterprise cybersecurity and zero-trust solutions, we implement rigorous administrative, technical, and physical security measures designed to protect your personal data against unauthorized access, disclosure, alteration, or destruction. However, no electronic transmission over the internet or information storage technology can be guaranteed 100% secure.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">05</span>
              Your Data Rights
            </h2>
            <p>
              You maintain rights regarding your personal information, including the right to access, correct, update, or request deletion of personal data we hold about you. To exercise these rights, please contact us directly using the details provided below.
            </p>
          </section>

          {/* Section 6: Contact Us */}
          <section className="space-y-4 bg-gradient-to-br from-slate-900 to-slate-900/80 p-6 sm:p-8 rounded-2xl border border-mavora-teal/20">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mavora-teal/10 text-mavora-teal text-sm font-bold border border-mavora-teal/20">06</span>
              Contact Information
            </h2>
            <p>
              If you have questions, comments, or formal concerns regarding this Privacy Policy, please reach out to our compliance team:
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