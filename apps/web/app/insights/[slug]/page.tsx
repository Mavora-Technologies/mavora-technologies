import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInsightBySlug, getInsights } from '@/lib/insights-queries';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Tag, 
  ArrowRight,
  BookOpen,
  Share2
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const articles = await getInsights();
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getInsightBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found | Mavora Insights',
    };
  }

  return {
    title: `${article.title} | Mavora Technologies Insights`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [typeof article.author === 'string' ? article.author : article.author?.name],
    },
  };
}

/**
 * Custom lightweight Markdown parser to format headers, lists, 
 * bold text, and unescape raw '\n' strings safely.
 */
function renderArticleContent(content: string) {
  if (!content) return null;

  // Unescape literal '\\n' backslashes to actual newlines
  const cleaned = content.replace(/\\n/g, '\n');
  
  // Split into structural blocks
  const blocks = cleaned.split('\n').map((b) => b.trim()).filter(Boolean);

  return blocks.map((block, idx) => {
    // H1 Heading
    if (block.startsWith('# ')) {
      return (
        <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-10 mb-4 first:mt-0">
          {formatInlineText(block.replace(/^#\s+/, ''))}
        </h1>
      );
    }
    // H2 Heading
    if (block.startsWith('## ')) {
      return (
        <h2 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-8 mb-3 border-b border-slate-100 pb-2">
          {formatInlineText(block.replace(/^##\s+/, ''))}
        </h2>
      );
    }
    // H3 Heading
    if (block.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-lg font-bold text-slate-900 tracking-tight mt-6 mb-2">
          {formatInlineText(block.replace(/^###\s+/, ''))}
        </h3>
      );
    }
    // Unordered List Items
    if (block.startsWith('* ') || block.startsWith('- ')) {
      return (
        <div key={idx} className="flex items-start gap-3 my-2 pl-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 flex-shrink-0" />
          <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
            {formatInlineText(block.replace(/^[\*\-]\s+/, ''))}
          </p>
        </div>
      );
    }
    // Blockquote
    if (block.startsWith('> ')) {
      return (
        <blockquote key={idx} className="border-l-4 border-blue-600 bg-blue-50/60 rounded-r-2xl p-4 my-6 italic text-slate-700">
          {formatInlineText(block.replace(/^>\s+/, ''))}
        </blockquote>
      );
    }
    // Standard Paragraph
    return (
      <p key={idx} className="text-slate-700 leading-relaxed my-5 text-base sm:text-lg">
        {formatInlineText(block)}
      </p>
    );
  });
}

/** Helper to format inline bold formatting (**bold**) */
function formatInlineText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default async function InsightDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = await getInsightBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const authorName = typeof article.author === 'string' 
    ? article.author 
    : article.author?.name || 'Engineering Team';

  const allArticles = await getInsights();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-900 overflow-x-hidden pt-24">
      
      {/* Edge-to-Edge Top Navigation Bar */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40 2xl:px-64 mb-8">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-white/70 hover:bg-white px-4 py-2 rounded-full border border-slate-200/80 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Insights
        </Link>
      </div>

      <main className="w-full flex flex-col">
        
        {/* Full-Width Article Header */}
        <header className="w-full bg-white px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40 2xl:px-64 py-12 lg:py-16 border-y border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 border border-blue-100 text-blue-700">
                <Tag className="w-3 h-3 text-blue-600" /> {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 border border-slate-200 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-blue-600" /> {article.readTime || '3 min read'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.publishedAt}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-lg sm:text-xl xl:text-2xl text-slate-600 leading-relaxed font-normal border-l-2 border-blue-500 pl-4 max-w-5xl">
              {article.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-600 max-w-5xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-600/20">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{authorName}</span>
                <span className="text-xs text-slate-500">Mavora Engineering Team</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-mono text-slate-400">Technical Insight</span>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </header>

        {/* Full-Width Article Body Content */}
        <article className="w-full bg-white px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40 2xl:px-64 py-12 lg:py-16 border-b border-slate-200/90 shadow-sm">
          <div className="max-w-4xl">
            {renderArticleContent(article.content)}
          </div>
        </article>

        {/* Edge-to-Edge Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40 2xl:px-64 py-16 pb-24">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Explore More Insights</h3>
              <Link href="/insights" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10">
              {relatedArticles.map((item) => (
                <div 
                  key={item.slug}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 lg:p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 border border-blue-100 text-blue-700">
                      {item.category}
                    </span>
                    <h4 className="text-lg lg:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                      <Link href={`/insights/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
                    <span>{item.publishedAt}</span>
                    <Link 
                      href={`/insights/${item.slug}`}
                      className="font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                    >
                      Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}