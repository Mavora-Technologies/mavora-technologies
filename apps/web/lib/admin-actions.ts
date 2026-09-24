'use server';

import { db } from '@/db';
import { insights, projects } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// --- INSIGHTS ACTIONS ---

export async function toggleInsightPublished(id: string, currentPublished: boolean) {
  try {
    await db
      .update(insights)
      .set({ published: !currentPublished, updatedAt: new Date() })
      .where(eq(insights.id, id));

    revalidatePath('/insights');
    revalidatePath('/admin/insights');
    return { success: true };
  } catch (error) {
    console.error('Failed to toggle insight publish status:', error);
    return { success: false, error: 'Failed to update publish status' };
  }
}

export async function createInsight(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  coverImage?: string;
  published?: boolean;
  featured?: boolean;
}) {
  try {
    await db.insert(insights).values({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      author: data.author || 'Engineering Team',
      category: data.category || 'General',
      coverImage: data.coverImage || '',
      published: data.published ?? false,
      featured: data.featured ?? false,
    });

    revalidatePath('/insights');
    revalidatePath('/admin/insights');
    return { success: true };
  } catch (error) {
    console.error('Failed to create insight:', error);
    return { success: false, error: 'Failed to create insight' };
  }
}

export async function deleteInsight(id: string) {
  try {
    await db.delete(insights).where(eq(insights.id, id));
    revalidatePath('/insights');
    revalidatePath('/admin/insights');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete insight:', error);
    return { success: false, error: 'Failed to delete insight' };
  }
}

// --- PROJECTS ACTIONS ---

export async function createProject(data: {
  title: string;
  slug: string;
  client: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  featured?: boolean;
  technologies: string[];
}) {
  try {
    await db.insert(projects).values({
      title: data.title,
      slug: data.slug,
      client: data.client,
      industry: data.industry,
      description: data.description,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results,
      featured: data.featured ?? false,
      technologies: data.technologies,
    });

    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error) {
    console.error('Failed to create project:', error);
    return { success: false, error: 'Failed to create project' };
  }
}

export async function deleteProject(id: string) {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete project:', error);
    return { success: false, error: 'Failed to delete project' };
  }
}