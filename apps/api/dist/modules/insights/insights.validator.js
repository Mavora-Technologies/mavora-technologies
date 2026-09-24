import { z } from 'zod';
export const createInsightSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    slug: z
        .string()
        .min(3, 'Slug must be at least 3 characters')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, alphanumeric, and URL-safe (hyphen separated)'),
    excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
    content: z.string().min(20, 'Content must be at least 20 characters'),
    author: z.string().min(2, 'Author name is required'),
    category: z.string().min(2, 'Category is required'),
    coverImage: z.string().url('Cover image must be a valid URL').optional().nullable(),
    published: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
});
export const updateInsightSchema = createInsightSchema.partial();
export const insightSlugParamSchema = z.object({
    slug: z
        .string()
        .min(1, 'Slug is required')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
});
