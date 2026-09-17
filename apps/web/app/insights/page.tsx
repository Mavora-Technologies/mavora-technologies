import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { INSIGHTS_DATA } from '@/lib/insights-data';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Code, 
  Cloud 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insights & Technical Perspectives | Mavora Technologies Ltd',
  description: 'Technical articles, architectural playbooks, and strategic analysis on AI automation, software engineering, cybersecurity, and cloud architecture.',
};

export default function InsightsPage() {
  const articles = Object.values(INSIGHTS_DATA);
  const featuredArticles = articles.filter((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-[#EBF3FF] text-slate-900 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative bg-[#EBF3FF] text-slate-900 py-20 lg:py-28 overflow-hidden border-b border-slate-200/80">
        {/* Background Grids & Ambient Lighting */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md mb-4">
              Perspectives & Tech Leadership
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-2 text-slate-900">
              Insights into Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700">Digital Engineering.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              In-depth engineering analyses, architectural guides, and executive perspectives on AI, cloud scalability, cybersecurity, and custom software delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      {featuredArticles.length > 0 && (
        <section className="py-20 relative bg-white/40 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900">Featured Playbooks</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div 
                  key={article.slug}
                  className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between border border-slate-800 shadow-xl group hover:border-teal-400/50 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle inner glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-400/10 border border-teal-400/20 text-teal-300">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-slate-400">
                        <Clock className="h-3.5 w-3.5 text-teal-400" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors leading-snug">
                      <Link href={`/insights/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-8 border-t border-slate-800 flex items-center justify-between relative z-10">
                    <div className="text-xs text-slate-400">
                      <span className="text-slate-200 font-semibold block">{article.author.name}</span>
                      <span>{article.publishedAt}</span>
                    </div>

                    <Link 
                      href={`/insights/${article.slug}`}
                      className="inline-flex items-center text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors gap-1.5"
                    >
                      Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Insights Grid */}
      <section className="py-20 relative bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Engineering Library"
            title="Latest Technical Articles"
            subtitle="Explore our practical guides to modern enterprise application development."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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

      {/* Newsletter / Stay Informed */}
      <section className="py-16 relative bg-[#EBF3FF] border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
            Stay Updated
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
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