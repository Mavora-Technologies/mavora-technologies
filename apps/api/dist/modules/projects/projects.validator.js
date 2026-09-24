import { z } from 'zod';
export const createProjectSchema = z.object({
    body: z.object({
        title: z.string().min(2, "Title is required"),
        slug: z.string().min(2, "Slug is required"),
        client: z.string().min(2, "Client name is required"),
        industry: z.string().min(2, "Industry is required"),
        description: z.string().min(5, "Description is required"),
        challenge: z.string().min(5, "Challenge details are required"),
        solution: z.string().min(5, "Solution details are required"),
        results: z.string().min(5, "Results metrics are required"),
        featured: z.boolean().optional(),
        coverImage: z.string().optional(),
        technologies: z.array(z.string()),
    }),
});
export const updateProjectSchema = z.object({
    body: createProjectSchema.shape.body.partial(),
});
