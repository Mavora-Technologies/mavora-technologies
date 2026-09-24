import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getInsights } from '@/lib/insights-queries';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Terminal
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insights & Technical Perspectives | Mavora Technologies Ltd',
  description: 'Technical articles, architectural playbooks, and strategic analysis on AI automation, software engineering, cybersecurity, and cloud architecture.',
};

// Ensure dynamic rendering so fresh database rows appear instantly
export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  const articles = await getInsights();
  const featuredArticles = articles.filter((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative bg-[#EBF3FF] text-slate-900 py-10 sm:py-14 lg:py-20 overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
                Perspectives & Tech Leadership
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
                Insights into Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">Digital Engineering.</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                In-depth engineering analyses, architectural guides, and executive perspectives on AI, cloud scalability, cybersecurity, and custom software delivery.
              </p>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80" 
                  alt="Software engineering workspace" 
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wide bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
                    <Terminal className="w-4 h-4 text-teal-400" />
                    <span>Architectural Playbooks</span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300">
                    Expert Analysis
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* All Insights Grid */}
      <section className="py-12 lg:py-20 relative bg-white/40">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 relative z-10">
          <SectionHeading
            badge="Engineering Library"
            title="Latest Technical Articles"
            subtitle="Explore our practical guides to modern enterprise application development."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 lg:mt-12">
            {articles.map((article) => (
              <div 
                key={article.slug}
                className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 border border-blue-100 text-blue-700">
                      {article.category}
                    </span>
                    <span className="font-mono text-slate-500">{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                    <Link href={`/insights/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{article.publishedAt}</span>
                  <Link 
                    href={`/insights/${article.slug}`}
                    className="font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-14 lg:py-16 relative bg-[#EBF3FF] border-t border-slate-200/80">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 text-center space-y-6 relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
            Stay Updated
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Subscribe to Engineering Insights
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
            Receive concise technical briefs on enterprise software, AI automation pipelines, and cloud security directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <input 
              type="email" 
              placeholder="Enter your corporate email" 
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300/80 bg-white/90 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
            />
            <Button 
              variant="primary" 
              size="md" 
              className="w-full sm:w-auto shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 px-6 py-3 border-0 rounded-xl"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}