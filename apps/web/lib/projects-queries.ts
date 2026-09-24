import { db } from '@/db';
import { projects } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function getProjects() {
  try {
    const data = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      client: item.client,
      industry: item.industry,
      description: item.description,
      challenge: item.challenge,
      solution: item.solution,
      results: item.results,
      featured: item.featured,
      coverImage: item.coverImage || '',
      technologies: Array.isArray(item.technologies) ? item.technologies : [],
    }));
  } catch (error) {
    console.error('❌ Failed to fetch projects from database:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const data = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);

    if (data.length === 0) return null;

    const item = data[0];
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      client: item.client,
      industry: item.industry,
      description: item.description,
      challenge: item.challenge,
      solution: item.solution,
      results: item.results,
      featured: item.featured,
      coverImage: item.coverImage || '',
      technologies: Array.isArray(item.technologies) ? item.technologies : [],
    };
  } catch (error) {
    console.error(`❌ Failed to fetch project with slug ${slug}:`, error);
    return null;
  }
}