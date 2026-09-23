import { Request, Response } from 'express';
import { db } from '../../db';
import { leads } from '../../db/schema';
import { sendLeadConfirmationEmail } from '../../utils/mailer';

export const createLead = async (req: Request, res: Response) => {
  try {
    const { fullName, email, company, phone, service, message, source } = req.body;

    const payload = {
      fullName,
      email,
      company: company || null,
      phone: phone || null,
      service,
      message: message || null,
      status: 'NEW' as const,
      source: source || 'Website Contact Form',
    };

    // 1. Save lead to Database
    const [newLead] = await db.insert(leads).values(payload).returning();

    // 2. Dispatch email asynchronously (non-blocking)
    try {
      sendLeadConfirmationEmail({
        to: newLead.email,
        fullName: newLead.fullName,
        service: newLead.service,
      });
    } catch (mailError) {
      console.error('⚠️ Failed to send confirmation email:', mailError);
    }

    // 3. Respond immediately to frontend
    return res.status(201).json({
      success: true,
      data: newLead,
      message: 'Lead captured successfully',
    });
  } catch (error: any) {
    console.error('❌ Database insertion error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to create lead' 
    });
  }
};