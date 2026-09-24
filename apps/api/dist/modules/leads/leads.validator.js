import { z } from 'zod';
export const createLeadSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('A valid email address is required'),
    company: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    service: z.string().min(1, 'Service is required'),
    message: z.string().min(1, 'Message is required'),
    source: z.string().optional(),
});
