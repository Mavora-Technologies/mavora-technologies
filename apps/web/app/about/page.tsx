import React from 'react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
    <div className="min-h-screen bg-mavora-light">
      {/* Hero Section */}
      <section className="bg-mavora-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1769FF_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="teal">About Mavora Technologies</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-4">
              Building Trust Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-mavora-teal to-blue-400">Intelligent Digital Engineering.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Mavora Technologies Ltd is a forward-thinking technology consulting firm bridging the gap between bold ideas and resilient enterprise execution. We partner with SMEs, enterprises, and institutions across Africa and globally.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Story / Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="blue">Our Identity</Badge>
              <h2 className="text-3xl font-bold text-mavora-navy">
                Empowering Businesses & Communities in a Rapidly Changing World
              </h2>
              <p className="text-slate-600 leading-relaxed">
                In today's fast-moving economic landscape, business success requires more than off-the-shelf software. It demands intelligent, secure, and scalable technology tailored to specific operational realities.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Founded with a mission to solve real-world problems, Mavora Technologies combines full-stack software development, AI workflow automation, enterprise cybersecurity, and cloud engineering into cohesive digital platforms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-mavora-teal shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-mavora-navy text-sm">Enterprise-Grade Code</h3>
                    <p className="text-xs text-slate-500">TypeScript strict mode, robust error handling, and clean architectures.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-mavora-teal shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-mavora-navy text-sm">Local & Global Reach</h3>
                    <p className="text-xs text-slate-500">Rooted in African innovation, aligned with global technological standards.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-mavora-navy text-white p-8 rounded-2xl shadow-xl space-y-6 border border-slate-800">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <Cpu className="h-8 w-8 text-mavora-teal" />
                <div>
                  <h3 className="font-bold text-lg">Mavora Technologies Ltd</h3>
                  <p className="text-xs text-slate-400">Incorporated Corporate Solution Provider</p>
                </div>
              </div>
              <blockquote className="italic text-slate-300 text-sm leading-relaxed">
                “Turning innovative ideas into powerful digital solutions.”
              </blockquote>
              <div className="space-y-3 pt-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Primary Stack</span>
                  <span className="text-white font-mono">Next.js, Node.js, Neon PostgreSQL</span>
                </div>
                <div className="flex justify-between">
                  <span>Focus Areas</span>
                  <span className="text-white font-mono">AI, Software, Security, Cloud</span>
                </div>
                <div className="flex justify-between">
                  <span>Architecture</span>
                  <span className="text-mavora-teal font-mono">Monorepo / ERP-Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-mavora-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-lg bg-mavora-blue/10 text-mavora-blue flex items-center justify-center mb-6">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-mavora-navy mb-4">Our Vision</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                “To become a leading technology company that helps businesses and communities grow through intelligent, secure, and innovative digital solutions.”
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-lg bg-mavora-teal/15 text-teal-800 flex items-center justify-center mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-mavora-navy mb-4">Our Mission</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                “To design and deliver reliable AI, software, cybersecurity, and IT solutions that solve real problems, improve efficiency, and create opportunities in a rapidly changing digital world.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="teal">Guiding Principles</Badge>
            <h2 className="text-3xl font-extrabold text-mavora-navy mt-3">Our Core Values</h2>
            <p className="text-slate-600 mt-2">These five pillars inform every line of code we write and every solution we architect.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="bg-mavora-light/60 p-6 rounded-xl border border-slate-200 text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-mavora-navy text-mavora-teal flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-mavora-navy mb-2">{v.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Philosophy & Approach */}
      <section className="py-20 bg-mavora-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <Badge variant="teal">Engineering Approach</Badge>
            <h2 className="text-3xl font-bold mt-3">Our Technology Philosophy</h2>
            <p className="text-slate-300 mt-2">We construct business software with strict attention to performance, security, and long-term maintainability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophyPillars.map((p, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <h3 className="text-lg font-bold text-mavora-teal mb-2">{p.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-mavora-navy">
            Ready to Accelerate Your Digital Growth?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Partner with Mavora Technologies to design, build, and deploy high-performing digital systems for your organization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button href="/request-project" variant="primary" size="lg">
              Start a Project <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button href="/request-consultation" variant="outline" size="lg">
              Request a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}