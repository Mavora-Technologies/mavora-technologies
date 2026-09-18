import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { INSIGHTS_DATA } from '@/lib/insights-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, ArrowLeft, ArrowRight, UserCircle2, Share2, Terminal, Code2, ShieldCheck } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = INSIGHTS_DATA[slug];

  if (!article) {
    return { title: 'Article Not Found | Mavora Technologies' };
  }

  return {
    title: `${article.title} | Mavora Insights`,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  return Object.keys(INSIGHTS_DATA).map((slug) => ({
    slug,
  }));
}

export default async function InsightDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = INSIGHTS_DATA[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-x-hidden">
      
      {/* Header / Hero Section - Reduced top spacing & Edge-to-Edge with Unsplash Image */}
      <section className="relative bg-[#EBF3FF] text-slate-900 py-10 sm:py-14 lg:py-20 overflow-hidden border-b border-slate-200/80">
        {/* Ambient Radial Grids & Lighting */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <Link 
                href="/insights" 
                className="inline-flex items-center text-xs font-mono font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Insights
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
                  {article.category}
                </span>
                <span className="text-xs text-slate-600 font-mono font-medium flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-slate-200/80 shadow-sm">
                  <Clock className="h-3.5 w-3.5 text-teal-600" />
                  {article.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
                {article.title}
              </h1>

              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">
                    <UserCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-slate-900 font-bold block text-sm">{article.author.name}</span>
                    <span className="text-slate-500">{article.author.role}</span>
                  </div>
                </div>
                <span className="font-mono bg-white/80 px-3 py-1 rounded-full border border-slate-200/80 shadow-sm">
                  {article.publishedAt}
                </span>
              </div>
            </div>

            {/* Hero Right-Side Tech Architecture Unsplash Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80" 
                  alt="Enterprise system architecture and code analysis" 
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wide bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
                    <Code2 className="w-4 h-4 text-teal-400" />
                    <span>Technical Brief</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300">
                    Peer Reviewed
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Article Content */}
      <section className="py-14 lg:py-20 relative bg-white/40">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Excerpt Lead Box */}
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm border-l-4 border-l-teal-500">
              <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed italic">
                {article.excerpt}
              </p>
            </div>

            {/* Article Body Paragraphs */}
            <div className="space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
              {article.content.map((paragraph, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-xs text-slate-800 leading-relaxed"
                >
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="pt-10 mt-10 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link 
                href="/insights" 
                className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Explore More Insights
              </Link>
              <Button 
                href="/request-consultation" 
                variant="secondary" 
                size="sm" 
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/25 px-5 py-2.5 border-0 rounded-xl"
              >
                Discuss This Architecture <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}