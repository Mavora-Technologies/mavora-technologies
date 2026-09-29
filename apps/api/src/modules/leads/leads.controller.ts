// apps/api/src/modules/leads/leads.controller.ts
import { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db';
import { leads, auditLogs } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { sendLeadConfirmationEmail } from '../../utils/mailer';

const createLeadSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, 'Service is required'),
  message: z.string().optional(),
  source: z.string().optional(),
});

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leadsList = await db.select().from(leads).orderBy(desc(leads.createdAt));
    return res.status(200).json({ success: true, count: leadsList.length, data: leadsList });
  } catch (error: any) {
    console.error('❌ Error fetching leads:', error);
    return res.status(500).json({ success: false, message: 'Internal server error while fetching leads.' });
  }
};

export const getLead = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });
    return res.status(200).json({ success: true, data: lead });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const validationResult = createLeadSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: validationResult.error.flatten().fieldErrors });
    }

    const { fullName, email, company, phone, service, message, source } = validationResult.data;
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

    // 2. Try recording the audit log and catch any specific database schema mismatch
    try {
      const actor = (req as any).user?.name || (req as any).user?.email || fullName || 'Website Visitor';
      await db.insert(auditLogs).values({
        performedBy: actor,
        action: 'CREATE_LEAD',
        details: `New lead captured for ${fullName} (${email})`,
      } as any);
      console.log('✅ Audit log successfully written for lead creation');
    } catch (auditErr: any) {
      console.error('⚠️ AUDIT LOG INSERT FAILED:', auditErr.message || auditErr);
    }

    sendLeadConfirmationEmail({ to: newLead.email, fullName: newLead.fullName, service: newLead.service }).catch(() => {});

    return res.status(201).json({ success: true, data: newLead, message: 'Lead captured successfully' });
  } catch (error: any) {
    console.error('❌ Database insertion error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to create lead' });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, message: 'Status is required.' });

    const [updatedLead] = await db.update(leads).set({ status, updatedAt: new Date() }).where(eq(leads.id, id)).returning();
    if (!updatedLead) return res.status(404).json({ success: false, message: 'Lead not found.' });

    try {
      const adminName = (req as any).user?.name || (req as any).user?.email || 'System Admin';
      await db.insert(auditLogs).values({
        performedBy: adminName,
        action: 'UPDATE_LEAD_STATUS',
        details: `Updated lead status for ${updatedLead.fullName} to ${status}`,
      } as any);
    } catch (auditErr: any) {
      console.error('⚠️ AUDIT LOG UPDATE FAILED:', auditErr.message || auditErr);
    }

    return res.status(200).json({ success: true, message: 'Lead status updated successfully.', data: updatedLead });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to update lead status.' });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const [deletedLead] = await db.delete(leads).where(eq(leads.id, id)).returning();
    if (!deletedLead) return res.status(404).json({ success: false, message: 'Lead not found.' });

    try {
      const adminName = (req as any).user?.name || (req as any).user?.email || 'System Admin';
      await db.insert(auditLogs).values({
        performedBy: adminName,
        action: 'DELETE_LEAD',
        details: `Deleted lead: ${deletedLead.fullName}`,
      } as any);
    } catch (auditErr: any) {
      console.error('⚠️ AUDIT LOG DELETE FAILED:', auditErr.message || auditErr);
    }

    return res.status(200).json({ success: true, message: 'Lead deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete lead.' });
  }
};