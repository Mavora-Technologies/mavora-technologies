// apps/api/src/routes/leads.ts
import { Router, Request, Response } from 'express';
import { db } from '../db';
import { leads } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 1. GET /api/leads - Fetch all leads for the Admin Portal
router.get('/', async (_req: Request, res: Response) => {
  try {
    const allLeads = await db.select().from(leads);
    return res.status(200).json({ success: true, data: allLeads });
  } catch (error: any) {
    console.error('❌ Error fetching leads from database:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error while fetching leads.',
      errorDetail: error?.message || String(error),
    });
  }
});

// 2. POST /api/leads - Submit a new lead / contact message
router.post('/', async (req: Request, res: Response) => {
  console.log('📥 INCOMING LEAD PAYLOAD FROM FRONTEND:', req.body);

  try {
    const body = req.body || {};
    
    const fullName = body.fullName || body.name;
    const email = body.workEmail || body.email;
    const company = body.companyName || body.company;
    const phone = body.phone;
    const service = body.service || body.inquiryType || body.inquirySubject || 'General Inquiry';
    const message = body.projectOverview || body.message;

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

    // Insert using Drizzle ORM matching your exact leads table schema columns
    const [newLead] = await db.insert(leads).values({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : null,
      phone: phone ? String(phone).trim() : null,
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

// 3. PATCH /api/leads/:id/status - Update lead status (e.g. NEW -> CONTACTED -> CLOSED)
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const leadId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { status } = req.body;

    if (!leadId) {
      return res.status(400).json({ success: false, message: 'Lead ID is required.' });
    }

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    const [updatedLead] = await db
      .update(leads)
      .set({ 
        status: status.trim(), 
        updatedAt: new Date() 
      })
      .where(eq(leads.id, leadId))
      .returning();

    if (!updatedLead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    return res.status(200).json({ success: true, data: updatedLead });
  } catch (error: any) {
    console.error('❌ Error updating lead status:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error while updating lead status.',
      errorDetail: error?.message || String(error),
    });
  }
});

// 4. DELETE /api/leads/:id - Delete a lead from the database
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const leadId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!leadId) {
      return res.status(400).json({ success: false, message: 'Lead ID is required.' });
    }

    const [deletedLead] = await db
      .delete(leads)
      .where(eq(leads.id, leadId))
      .returning();

    if (!deletedLead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    return res.status(200).json({ success: true, message: 'Lead deleted successfully.' });
  } catch (error: any) {
    console.error('❌ Error deleting lead:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error while deleting lead.',
      errorDetail: error?.message || String(error),
    });
  }
});

export default router;