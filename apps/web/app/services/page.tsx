import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Custom Software Development Services | Mavora Technologies Ltd',
  description: 'Enterprise-grade custom software development tailored to scale your operations.',
};

export default function SoftwareDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-hidden w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#EBF3FF] text-slate-900 py-20 md:py-28 lg:py-32 2xl:py-48 w-full overflow-hidden border-b border-slate-200/80">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] 2xl:[background-size:48px_48px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 lg:-left-32 w-[450px] lg:w-[600px] h-[450px] lg:h-[600px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Fluid Edge-to-Edge Container */}
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-40 3xl:px-64 relative z-10 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 2xl:gap-24 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-6 2xl:space-y-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 2xl:px-6 2xl:py-3 rounded-full text-xs md:text-sm 2xl:text-base font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
                Service Deep Dive
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-8xl font-extrabold tracking-tight leading-tight text-slate-900">
                Custom Software Development
              </h1>
              <p className="text-xl md:text-2xl 2xl:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">
                Engineered for scalability, performance, and long-term business value.
              </p>
              <p className="text-slate-600 text-base md:text-lg 2xl:text-2xl leading-relaxed pt-2 2xl:pt-4 max-w-3xl 2xl:max-w-5xl">
                We build robust, secure, and scalable custom software applications designed to fit your unique operational workflows and accelerate digital transformation.
              </p>
              
              {/* Responsive Button Group */}
              <div className="flex flex-col sm:flex-row gap-4 2xl:gap-6 pt-6 2xl:pt-10 w-full sm:w-auto">
                <Link 
                  href="/request-project" 
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3.5 2xl:px-10 2xl:py-5 text-base 2xl:text-xl rounded-xl 2xl:rounded-2xl transition-all w-full sm:w-auto"
                >
                  Request This Service <ArrowRight className="ml-2 h-5 w-5 2xl:h-7 2xl:w-7" />
                </Link>
                <Link 
                  href="/request-consultation" 
                  className="inline-flex items-center justify-center text-slate-800 border border-slate-300 bg-white/80 hover:bg-slate-100 px-6 py-3.5 2xl:px-10 2xl:py-5 text-base 2xl:text-xl rounded-xl 2xl:rounded-2xl transition-all shadow-sm w-full sm:w-auto"
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Image Content */}
            <div className="lg:col-span-5 relative w-full h-full flex items-center justify-center">
              <div className="relative w-full rounded-2xl 2xl:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white/50 backdrop-blur-md p-2 2xl:p-4">
                <Image 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                  alt="Software development illustration"
                  width={1200}
                  height={900}
                  className="rounded-xl 2xl:rounded-2xl object-cover w-full h-[320px] sm:h-[400px] lg:h-[500px] 2xl:h-[700px] transition-transform duration-700 hover:scale-[1.02]"
                  unoptimized
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-16 md:py-24 2xl:py-32 w-full relative bg-white/40 border-b border-slate-200/80">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-40 3xl:px-64 relative z-10 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 2xl:gap-16">
            
            {/* The Challenge Card */}
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 p-8 md:p-10 2xl:p-16 rounded-2xl 2xl:rounded-3xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-center">
              <div className="flex items-center gap-3 md:gap-4 text-red-700 font-bold text-lg md:text-xl 2xl:text-3xl mb-4 2xl:mb-6">
                <AlertTriangle className="h-6 w-6 md:h-7 md:w-7 2xl:h-10 2xl:w-10 shrink-0" />
                <span>The Challenge</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base 2xl:text-2xl">
                Off-the-shelf software forces your business into rigid constraints, leading to operational inefficiencies, siloed data, and heavy technical debt.
              </p>
            </div>

            {/* The Solution Card */}
            <div className="bg-teal-50/80 backdrop-blur-sm border border-teal-200 p-8 md:p-10 2xl:p-16 rounded-2xl 2xl:rounded-3xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-center">
              <div className="flex items-center gap-3 md:gap-4 text-teal-800 font-bold text-lg md:text-xl 2xl:text-3xl mb-4 2xl:mb-6">
                <CheckCircle2 className="h-6 w-6 md:h-7 md:w-7 2xl:h-10 2xl:w-10 text-teal-600 shrink-0" />
                <span>The Mavora Solution</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base 2xl:text-2xl">
                Tailored architectures built from the ground up to match your exact processes, ensuring seamless integrations, high security, and effortless scale.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}