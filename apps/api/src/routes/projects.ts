import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { db } from '../db/index.js';
import { projectRequests } from '../db/schema.js';
import { sendProjectRequestConfirmationEmail } from '../services/email.js';

const router = Router();

const projectRequestSchema = z.object({
  selectedServices: z.array(z.string()).min(1, 'At least one service must be selected'),
  timeline: z.string().optional(),
  projectOverview: z.string().min(5, 'Project overview must be at least 5 characters'),
  fullName: z.string().min(2, 'Full name is required'),
  workEmail: z.string().email('Invalid email address'),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  requestNda: z.boolean().optional().default(false),
});

router.post('/request', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = projectRequestSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const validatedData = parseResult.data;

    const insertPayload: typeof projectRequests.$inferInsert = {
      selectedServices: validatedData.selectedServices,
      timeline: validatedData.timeline ?? null,
      projectOverview: validatedData.projectOverview,
      fullName: validatedData.fullName,
      workEmail: validatedData.workEmail,
      companyName: validatedData.companyName ?? null,
      phone: validatedData.phone ?? null,
      requestNda: validatedData.requestNda,
    };

    const [newRequest] = await db.insert(projectRequests).values(insertPayload).returning();

    // Trigger confirmation email
    sendProjectRequestConfirmationEmail(validatedData.workEmail, validatedData.fullName).catch((err) =>
      console.error('Async email error:', err)
    );

    return res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    console.error('❌ Database Error saving project request:', error);
    return next(error);
  }
});

export default router;