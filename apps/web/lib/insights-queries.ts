import { db } from '@/db';
import { insights } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function getInsights() {
  try {
    const data = await db
      .select()
      .from(insights)
      .where(eq(insights.published, true))
      .orderBy(desc(insights.createdAt));

    return data.map((item: any) => {
      const content = item.content || '';
      const wordCount = content.split(/\s+/).filter(Boolean).length;
      const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

      // Fixed with type assertion to prevent TypeScript errors
      const rawDate = item.createdAt || item.created_at;
      const publishedAt = rawDate
        ? new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }).format(new Date(rawDate))
        : 'Recent';

      return {
        slug: item.slug || '',
        title: item.title || 'Untitled',
        excerpt: item.excerpt || '',
        content: content,
        category: item.category || 'General',
        coverImage: item.coverImage ?? item.cover_image ?? '',
        featured: Boolean(item.featured),
        author: {
          name: item.author || 'Engineering Team',
        },
        publishedAt,
        readTime: `${readTimeMinutes} min read`,
      };
    });
  } catch (error) {
    console.error('❌ Failed to fetch insights from Neon database:', error);
    return [];
  }
}

export async function getInsightBySlug(slug: string) {
  try {
    const data = await db
      .select()
      .from(insights)
      .where(eq(insights.slug, slug))
      .limit(1);

    if (data.length === 0) return null;

    const item: any = data[0];
    const content = item.content || '';
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const rawDate = item.createdAt || item.created_at;
    const publishedAt = rawDate
      ? new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(rawDate))
      : 'Recent';

    return {
      slug: item.slug || '',
      title: item.title || 'Untitled',
      excerpt: item.excerpt || '',
      content: content,
      category: item.category || 'General',
      coverImage: item.coverImage ?? item.cover_image ?? '',
      featured: Boolean(item.featured),
      author: {
        name: item.author || 'Engineering Team',
      },
      publishedAt,
      readTime: `${readTimeMinutes} min read`,
    };
  } catch (error) {
    console.error(`❌ Failed to fetch insight with slug ${slug}:`, error);
    return null;
  }
}