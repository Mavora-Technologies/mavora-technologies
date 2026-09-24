import { z } from 'zod';
export const createInsightSchema = z.object({
    body: z.object({
        title: z.string().min(2, "Title is required"),
        slug: z.string().min(2, "Slug is required"),
        excerpt: z.string().min(5, "Excerpt is required"),
        content: z.string().min(10, "Content is required"),
        author: z.string().min(2, "Author name is required"),
        category: z.string().min(2, "Category is required"),
        coverImage: z.string().optional(),
        published: z.boolean().optional(),
    }),
});
export const updateInsightSchema = z.object({
    body: createInsightSchema.shape.body.partial(),
});
