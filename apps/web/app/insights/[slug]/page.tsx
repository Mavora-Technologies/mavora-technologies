import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { INSIGHTS_DATA } from '@/lib/insights-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, ArrowLeft, ArrowRight, UserCircle2, Share2 } from 'lucide-react';

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
    <div className="min-h-screen bg-mavora-light">
      {/* Header / Hero */}
      <section className="bg-mavora-navy text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Link href="/insights" className="inline-flex items-center text-xs font-mono text-mavora-teal hover:underline mb-2">
            <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Back to Insights
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="teal">{article.category}</Badge>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-mavora-teal" />
              {article.readTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {article.title}
          </h1>
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <UserCircle2 className="h-5 w-5 text-mavora-teal" />
              <div>
                <span className="text-white font-medium block">{article.author.name}</span>
                <span>{article.author.role}</span>
              </div>
            </div>
            <span>{article.publishedAt}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <p className="text-lg font-medium text-mavora-navy leading-relaxed border-l-4 border-mavora-teal pl-4 italic">
            {article.excerpt}
          </p>

          <div className="space-y-6 text-slate-700 leading-relaxed text-base pt-4">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-10 mt-10 border-t border-slate-200 flex items-center justify-between">
            <Link href="/insights" className="text-xs font-bold text-mavora-blue hover:text-mavora-navy inline-flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Explore More Insights
            </Link>
            <Button href="/request-consultation" variant="secondary" size="sm" className="text-xs">
              Discuss This Architecture <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}