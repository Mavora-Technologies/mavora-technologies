import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db/index.js';
import { leads } from '../db/schema.js';
import { sendLeadConfirmationEmail } from '../services/email.js';
const router = Router();
const leadSchema = z.object({
    fullName: z.string().min(2, 'Full name is required (min 2 characters).'),
    email: z.string().email('A valid email address is required.'),
    company: z.string().nullable(),
    phone: z.string().nullable(),
    service: z.string().min(1, 'Service type is required.'),
    message: z.string().min(5, 'Message content is required (min 5 characters).'),
    source: z.string().default('Website Contact Form'),
});
router.post('/', async (req, res, next) => {
    try {
        const body = req.body || {};
        const rawPayload = {
            fullName: (body.fullName || body.name || '').trim(),
            email: (body.workEmail || body.email || '').trim().toLowerCase(),
            company: (body.companyName || body.company || '').trim() || null,
            phone: (body.phone || '').trim() || null,
            service: (body.service || body.inquiryType || body.inquirySubject || 'General Inquiry').trim(),
            message: (body.projectOverview || body.message || '').trim(),
            source: body.source,
        };
        const parseResult = leadSchema.safeParse(rawPayload);
        if (!parseResult.success) {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: parseResult.error.flatten().fieldErrors,
            });
        }
        const validatedData = parseResult.data;
        const insertPayload = {
            fullName: validatedData.fullName,
            email: validatedData.email,
            company: validatedData.company,
            phone: validatedData.phone,
            service: validatedData.service,
            message: validatedData.message,
            status: 'NEW',
            source: validatedData.source,
        };
        const [newLead] = await db.insert(leads).values(insertPayload).returning();
        // Trigger confirmation email
        sendLeadConfirmationEmail(validatedData.email, validatedData.fullName).catch((err) => console.error('Async email error:', err));
        return res.status(201).json({
            success: true,
            message: 'Thank you for reaching out! Your message has been received.',
            data: newLead,
        });
    }
    catch (error) {
        console.error('❌ Database Error saving lead via Drizzle:', error);
        return next(error);
    }
});
export default router;
