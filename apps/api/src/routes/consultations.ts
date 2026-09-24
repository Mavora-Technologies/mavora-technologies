import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { db } from '../db/index.js';
import { consultationRequests } from '../db/schema.js';
import { sendConsultationConfirmationEmail } from '../services/email.js';

const router = Router();

const consultationRequestSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  workEmail: z.string().email('Invalid email address'),
  companyName: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTimeSlot: z.string().optional().nullable(),
  consultationType: z.string().optional().nullable(),
  discussionTopics: z.string().min(5, 'Discussion topics are required'),
});

// POST /api/consultation/request
router.post('/request', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body || {};

    const rawPayload = {
      fullName: body.fullName || body.name || '',
      workEmail: body.workEmail || body.email || '',
      companyName: body.companyName || body.company || null,
      phone: body.phone || null,
      preferredDate: body.preferredDate || '',
      preferredTimeSlot: body.preferredTimeSlot || body.timeSlot || null,
      consultationType: body.consultationType || body.type || 'General Consultation',
      discussionTopics: body.discussionTopics || body.topics || body.message || '',
    };

    const parseResult = consultationRequestSchema.safeParse(rawPayload);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const data = parseResult.data;

    const insertPayload: typeof consultationRequests.$inferInsert = {
      fullName: data.fullName,
      workEmail: data.workEmail,
      companyName: data.companyName ?? null,
      phone: data.phone ?? null,
      preferredDate: data.preferredDate,
      preferredTimeSlot: data.preferredTimeSlot ?? 'Flexible',
      consultationType: data.consultationType ?? 'General Consultation',
      discussionTopics: data.discussionTopics,
    };

    const [newRequest] = await db
      .insert(consultationRequests)
      .values(insertPayload)
      .returning();

    // Trigger confirmation email asynchronously
    sendConsultationConfirmationEmail(data.workEmail, data.fullName, data.preferredDate).catch((err) =>
      console.error('Async email error:', err)
    );

    return res.status(201).json({
      success: true,
      message: 'Consultation request received successfully',
      data: newRequest,
    });
  } catch (error) {
    console.error('❌ Error saving consultation request:', error);
    return next(error);
  }
});

export default router;