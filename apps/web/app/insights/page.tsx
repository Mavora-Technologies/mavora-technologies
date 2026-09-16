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
    <div className="min-h-screen bg-mavora-light">
      {/* Hero Section */}
      <section className="bg-mavora-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1769FF_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="teal">Perspectives & Tech Leadership</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mt-4">
              Insights into Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-mavora-teal to-blue-400">Digital Engineering.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              In-depth engineering analyses, architectural guides, and executive perspectives on AI, cloud scalability, cybersecurity, and custom software delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="h-5 w-5 text-mavora-teal" />
              <h2 className="text-xl font-bold text-mavora-navy">Featured Playbooks</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div 
                  key={article.slug}
                  className="bg-mavora-navy text-white rounded-2xl p-8 flex flex-col justify-between border border-slate-800 shadow-xl group hover:border-mavora-teal transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <Badge variant="teal">{article.category}</Badge>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="h-3.5 w-3.5 text-mavora-teal" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-mavora-teal transition-colors leading-snug">
                      <Link href={`/insights/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      <span className="text-slate-200 font-semibold block">{article.author.name}</span>
                      <span>{article.publishedAt}</span>
                    </div>

                    <Link 
                      href={`/insights/${article.slug}`}
                      className="inline-flex items-center text-xs font-bold text-mavora-teal hover:text-white transition-colors"
                    >
                      Read Article <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Insights Grid */}
      <section className="py-20 bg-mavora-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Library"
            title="Latest Technical Articles"
            subtitle="Explore our practical guides to modern enterprise application development."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div 
                key={article.slug}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-mavora-blue hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <Badge variant="blue">{article.category}</Badge>
                    <span className="font-mono">{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-mavora-navy hover:text-mavora-blue transition-colors line-clamp-2">
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
                    className="font-bold text-mavora-blue hover:text-mavora-navy inline-flex items-center gap-1"
                  >
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Stay Informed */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="teal">Stay Updated</Badge>
          <h2 className="text-3xl font-extrabold text-mavora-navy">
            Subscribe to Engineering Insights
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm">
            Receive concise technical briefs on enterprise software, AI automation pipelines, and cloud security directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <input 
              type="email" 
              placeholder="Enter your corporate email" 
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-mavora-blue text-mavora-navy"
            />
            <Button variant="primary" size="md" className="w-full sm:w-auto shrink-0">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}