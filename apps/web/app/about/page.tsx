import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { 
  Target, 
  Compass, 
  Zap, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Cpu, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Mavora Technologies Ltd',
  description: 'Learn about Mavora Technologies Ltd—our vision, mission, core values, and technology philosophy driving digital transformation.',
};

export default function AboutPage() {
  const values = [
    {
      name: '1. Innovation',
      icon: Zap,
      description: 'We continuously push boundaries, integrating modern AI, cloud, and modern software architectures to build solutions that outpace industry shifts.',
    },
    {
      name: '2. Security',
      icon: ShieldCheck,
      description: 'Security is never an afterthought. We implement zero-trust principles, robust data encryption, and resilient architectures in every platform we deliver.',
    },
    {
      name: '3. Excellence',
      icon: Award,
      description: 'We hold our engineering to the highest global standards—delivering maintainable codebases, seamless UI/UX, and high-availability backends.',
    },
    {
      name: '4. Learning',
      icon: BookOpen,
      description: 'Technology evolves daily. We foster continuous technical growth, adapting to emerging frameworks and methodologies to keep our clients ahead.',
    },
    {
      name: '5. Impact',
      icon: TrendingUp,
      description: 'We measure success by the tangible efficiency gains, security guarantees, and business expansion experienced by our clients and communities.',
    },
  ];

  const philosophyPillars = [
    {
      title: 'Security-First Engineering',
      desc: 'Protecting corporate data through strict access controls, secure API architecture, and OWASP-compliant coding standards.',
    },
    {
      title: 'Cloud-Native & Serverless',
      desc: 'Building high-concurrency systems optimized for maximum uptime, auto-scaling, and minimal latency.',
    },
    {
      title: 'AI & Data-Driven Logic',
      desc: 'Embedding artificial intelligence directly into operational workflows to turn raw data into strategic business leverage.',
    },
    {
      title: 'Modular & Maintainable Architecture',
      desc: 'Designing clean monorepos and decoupled systems that simplify future business and ERP integration.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-x-hidden w-full">
      
      {/* Hero Section */}
      <section className="relative bg-[#EBF3FF] text-slate-900 pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 overflow-hidden border-b border-slate-200/80 w-full">
        {/* Background Grids & Ambient Lighting */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
                About Mavora Technologies
              </span>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
                Building Trust Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">Intelligent Digital Engineering.</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Mavora Technologies Ltd is a forward-thinking technology consulting firm bridging the gap between bold ideas and resilient enterprise execution. We partner with SMEs, enterprises, and institutions across Africa and globally.
              </p>
            </div>
            <div className="lg:col-span-5 relative h-[320px] sm:h-[380px] lg:h-[420px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                alt="Technology team collaborating on digital engineering solutions"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Story / Introduction */}
      <section className="py-20 relative w-full">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-800 shadow-sm">
                Our Identity
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Empowering Businesses & Communities in a Rapidly Changing World
              </h2>
              <p className="text-slate-600 leading-relaxed">
                In today's fast-moving economic landscape, business success requires more than off-the-shelf software. It demands intelligent, secure, and scalable technology tailored to specific operational realities.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Founded with a mission to solve real-world problems, Mavora Technologies combines full-stack software development, AI workflow automation, enterprise cybersecurity, and cloud engineering into cohesive digital platforms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 bg-white/60 p-4 rounded-xl border border-slate-200/80 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Enterprise-Grade Code</h3>
                    <p className="text-xs text-slate-500">TypeScript strict mode, robust error handling, and clean architectures.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/60 p-4 rounded-xl border border-slate-200/80 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Local & Global Reach</h3>
                    <p className="text-xs text-slate-500">Rooted in African innovation, aligned with global technological standards.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/90 backdrop-blur-xl text-slate-900 p-8 rounded-2xl shadow-xl space-y-6 border border-slate-200">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                  <Cpu className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Mavora Technologies Ltd</h3>
                  <p className="text-xs text-slate-500">Incorporated Corporate Solution Provider</p>
                </div>
              </div>
              <blockquote className="italic text-slate-700 text-sm leading-relaxed border-l-2 border-blue-600 pl-3">
                “Turning innovative ideas into powerful digital solutions.”
              </blockquote>
              <div className="space-y-3 pt-2 text-xs text-slate-600">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Primary Stack</span>
                  <span className="text-slate-900 font-mono font-medium">Next.js, Node.js, Neon PostgreSQL</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Focus Areas</span>
                  <span className="text-slate-900 font-mono font-medium">AI, Software, Security, Cloud</span>
                </div>
                <div className="flex justify-between">
                  <span>Architecture</span>
                  <span className="text-teal-700 font-mono font-medium">Monorepo / ERP-Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 relative bg-white/40 border-y border-slate-200/80 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-inner">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  “To become a leading technology company that helps businesses and communities grow through intelligent, secure, and innovative digital solutions.”
                </p>
              </div>
              <div className="mt-8 relative h-48 w-full rounded-xl overflow-hidden shadow-inner">
                <Image
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                  alt="Futuristic digital network vision"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden hover:border-teal-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-6 shadow-inner">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  “To design and deliver reliable AI, software, cybersecurity, and IT solutions that solve real problems, improve efficiency, and create opportunities in a rapidly changing digital world.”
                </p>
              </div>
              <div className="mt-8 relative h-48 w-full rounded-xl overflow-hidden shadow-inner">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team executing tech mission and strategy"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 relative w-full">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm mb-3">
              Guiding Principles
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Our Core Values</h2>
            <p className="text-slate-600 mt-2">These five pillars inform every line of code we write and every solution we architect.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm">{v.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Philosophy & Approach */}
      <section className="py-20 relative bg-white/40 border-y border-slate-200/80 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80">
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
                alt="Advanced software engineering and code architecture"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-800 shadow-sm mb-3">
                  Engineering Approach
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mt-2">Our Technology Philosophy</h2>
                <p className="text-slate-600 mt-2">We construct business software with strict attention to performance, security, and long-term maintainability.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {philosophyPillars.map((p, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm hover:border-blue-300 transition-all">
                    <h3 className="text-lg font-bold text-teal-800 mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-[#EBF3FF] relative w-full">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Ready to Accelerate Your Digital Growth?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Partner with Mavora Technologies to design, build, and deploy high-performing digital systems for your organization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button 
              href="/request-project" 
              variant="secondary" 
              size="md" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3 border-0"
            >
              Start a Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              href="/request-consultation" 
              variant="ghost" 
              size="md" 
              className="text-slate-800 border border-slate-300 bg-white/80 hover:bg-slate-100 hover:border-slate-400 px-6 py-3 shadow-sm"
            >
              Request a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}