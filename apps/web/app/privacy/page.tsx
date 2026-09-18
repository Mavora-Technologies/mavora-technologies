import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-x-hidden w-full flex flex-col">
      
      {/* Sticky Glass Navigation Bar */}
      <div className="border-b border-slate-200/85 bg-white/75 backdrop-blur-md sticky top-0 z-50 w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" /> Back to Home
          </Link>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Legal & Compliance
          </span>
        </div>
      </div>

      {/* Hero Header - Edge-to-Edge Fluid Banner */}
      <section className="relative bg-[#EBF3FF] text-slate-900 py-8 sm:py-12 lg:py-16 overflow-hidden border-b border-slate-200/80 w-full">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-blue-400/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-teal-400/15 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md mb-3">
              <Shield className="w-3.5 h-3.5 text-teal-700 shrink-0" /> Data Protection & Trust
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">Policy.</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-3xl">
              Learn how Mavora Technologies Ltd. protects your personal information, ensures enterprise security, and maintains transparency across all engineering engagements.
            </p>
            <p className="mt-3 text-xs font-mono text-slate-500">
              Last updated: <span className="text-slate-800 font-semibold">January 2026</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid - Edge-to-Edge Responsive Layout */}
      <section className="py-8 sm:py-12 lg:py-16 relative bg-white/40 flex-grow w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 xl:gap-12 items-start">
            
            {/* Main Policy Sections */}
            <div className="lg:col-span-8 space-y-5 sm:space-y-6">
              
              {/* Section 01 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    01
                  </span>
                  Introduction
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  At <strong className="text-slate-900">Mavora Technologies Ltd.</strong> (“we,” “our,” or “us”), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, engage our custom software development, AI automation, cloud architecture, or cybersecurity services, or otherwise interact with us.
                </p>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access or use our services.
                </p>
              </div>

              {/* Section 02 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    02
                  </span>
                  Information We Collect
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  We may collect information about you in a variety of ways, including:
                </p>
                <ul className="space-y-2.5 sm:space-y-3 text-slate-600 text-xs sm:text-sm md:text-base">
                  <li className="flex items-start gap-3 bg-slate-50/80 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/60">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold mb-0.5">Personal Data</strong>
                      Personally identifiable information, such as your name, corporate email address, telephone number, and company name, that you voluntarily provide when filling out contact forms, requesting project proposals, or booking advisory sessions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-slate-50/80 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/60">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold mb-0.5">Derivative Data</strong>
                      Information automatically collected by our servers when you access our platform, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing our site.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-slate-50/80 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/60">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold mb-0.5">Project & Technical Data</strong>
                      Information shared during enterprise software scoping, cloud system evaluations, or security audits necessary for fulfilling our contractual obligations.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Section 03 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    03
                  </span>
                  How We Use Your Information
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we use information collected to:
                </p>
                <ul className="space-y-2 sm:space-y-2.5 text-slate-600 text-xs sm:text-sm md:text-base pl-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Fulfill and manage project requests, software builds, and technical consultations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Send administrative information to you, such as project updates, invoices, terms changes, and security alerts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Respond to customer service inquiries and support technical infrastructure operations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Improve platform functionality, website performance, and user experience through analytical insights.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Comply with applicable legal requirements, industry standards, and regulatory frameworks.</span>
                  </li>
                </ul>
              </div>

              {/* Section 04 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    04
                  </span>
                  Data Security & Protection
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  As a provider of enterprise cybersecurity and zero-trust solutions, we implement rigorous administrative, technical, and physical security measures designed to protect your personal data against unauthorized access, disclosure, alteration, or destruction. However, no electronic transmission over the internet or information storage technology can be guaranteed 100% secure.
                </p>
              </div>

              {/* Section 05 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    05
                  </span>
                  Your Data Rights
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  You maintain rights regarding your personal information, including the right to access, correct, update, or request deletion of personal data we hold about you. To exercise these rights, please contact us directly using the details provided below.
                </p>
              </div>

              {/* Section 06 */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 text-teal-400 font-mono text-xs font-bold shrink-0">
                    06
                  </span>
                  Contact Information
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  If you have questions, comments, or formal concerns regarding this Privacy Policy, please reach out to our compliance team:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                  <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200/80">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-slate-900 block mb-1 font-semibold">Headquarters</strong>
                      <span className="text-slate-600 leading-relaxed block">Wood Garden Road, off Wood Avenue, Kilimani, Nairobi</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/80 border border-slate-200/80">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <a href="mailto:info@mavoratechnologies.com" className="text-xs text-slate-900 hover:text-blue-600 font-bold transition-colors truncate">
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

            {/* Sidebar Security & Compliance Panel */}
            <div className="lg:col-span-4 space-y-5 sm:space-y-6">
              
              <div className="bg-slate-900 text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-800 space-y-5 sm:space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none" />

                <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider relative z-10 border-b border-slate-800 pb-3.5 sm:pb-4">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Security Standards</span>
                </div>

                <div className="space-y-4 sm:space-y-5 text-xs text-slate-300 leading-relaxed relative z-10">
                  <div className="flex items-start gap-3">
                    <Lock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Zero-Trust Architecture</strong>
                      We enforce end-to-end encryption and strict role-based access controls across all user touchpoints.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">100% IP Protection</strong>
                      All custom software developments, source code, and enterprise data remain strictly client intellectual property.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Regulatory Compliance</strong>
                      Built in alignment with regional data privacy laws and global enterprise security standards.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Office Info Card */}
              <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 border border-slate-200/80 backdrop-blur-md text-xs text-slate-600 space-y-2 sm:space-y-3 shadow-sm">
                <h3 className="font-bold text-slate-900 text-sm">Data Protection Officer</h3>
                <p className="leading-relaxed">Require a signed Mutual NDA, compliance documentation, or specialized security audit?</p>
                <a href="mailto:info@mavoratechnologies.com" className="font-bold text-blue-600 hover:text-blue-700 hover:underline block pt-1 break-all sm:break-normal">
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