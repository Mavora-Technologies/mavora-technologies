import { Router, Request, Response } from 'express';
import { db } from '../db';
import { leads } from '../db/schema';

const router = Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req: Request, res: Response) => {
  console.log('📥 INCOMING LEAD PAYLOAD FROM FRONTEND:', req.body);

  try {
    const body = req.body || {};
    
    const fullName = body.fullName || body.name;
    const email = body.email || body.workEmail;
    const company = body.company || body.companyName;
    const phone = body.phone;
    const service = body.service || body.inquiryType || 'General Inquiry';
    const message = body.message;

    // Validation checks
    if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation Error: Full name is required.' 
      });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation Error: A valid email address is required.' 
      });
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation Error: Message content is required.' 
      });
    }

    // Insert using Drizzle ORM
    const [newLead] = await db.insert(leads).values({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : null,
      phone: phone ? phone.trim() : null,
      service: service ? service.trim() : 'General Inquiry',
      message: message.trim(),
      status: 'NEW',
      source: body.source || 'Website Contact Form',
    }).returning();

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
      data: newLead,
    });
  } catch (error: any) {
    console.error('❌ Database Error saving lead via Drizzle:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit message due to a server error.',
      errorDetail: error?.message || String(error),
    });
  }
});

export default router;