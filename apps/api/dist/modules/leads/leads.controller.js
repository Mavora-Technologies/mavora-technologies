"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateStatus = exports.createLead = exports.getLead = exports.getLeads = void 0;
const zod_1 = require("zod");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const mailer_1 = require("../../utils/mailer");
const createLeadSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, 'Full name is required'),
    email: zod_1.z.string().email('Invalid email address'),
    company: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    service: zod_1.z.string().min(1, 'Service is required'),
    message: zod_1.z.string().optional(),
    source: zod_1.z.string().optional(),
});
const getLeads = async (req, res) => {
    try {
        const leadsList = await db_1.db.select().from(schema_1.leads).orderBy((0, drizzle_orm_1.desc)(schema_1.leads.createdAt));
        return res.status(200).json({ success: true, count: leadsList.length, data: leadsList });
    }
    catch (error) {
        console.error('❌ Error fetching leads:', error);
        return res.status(500).json({ success: false, message: 'Internal server error while fetching leads.' });
    }
};
exports.getLeads = getLeads;
const getLead = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const [lead] = await db_1.db.select().from(schema_1.leads).where((0, drizzle_orm_1.eq)(schema_1.leads.id, id));
        if (!lead)
            return res.status(404).json({ success: false, message: 'Lead not found.' });
        return res.status(200).json({ success: true, data: lead });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
exports.getLead = getLead;
const createLead = async (req, res) => {
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
            status: 'NEW',
            source: source || 'Website Contact Form',
        };
        // 1. Save lead to Database
        const [newLead] = await db_1.db.insert(schema_1.leads).values(payload).returning();
        // 2. Try recording the audit log and catch any specific database schema mismatch
        try {
            const actor = req.user?.name || req.user?.email || fullName || 'Website Visitor';
            await db_1.db.insert(schema_1.auditLogs).values({
                performedBy: actor,
                action: 'CREATE_LEAD',
                details: `New lead captured for ${fullName} (${email})`,
            });
            console.log('✅ Audit log successfully written for lead creation');
        }
        catch (auditErr) {
            console.error('⚠️ AUDIT LOG INSERT FAILED:', auditErr.message || auditErr);
        }
        (0, mailer_1.sendLeadConfirmationEmail)({ to: newLead.email, fullName: newLead.fullName, service: newLead.service }).catch(() => { });
        return res.status(201).json({ success: true, data: newLead, message: 'Lead captured successfully' });
    }
    catch (error) {
        console.error('❌ Database insertion error:', error);
        return res.status(500).json({ success: false, message: error.message || 'Failed to create lead' });
    }
};
exports.createLead = createLead;
const updateStatus = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const { status } = req.body;
        if (!status)
            return res.status(400).json({ success: false, message: 'Status is required.' });
        const [updatedLead] = await db_1.db.update(schema_1.leads).set({ status, updatedAt: new Date() }).where((0, drizzle_orm_1.eq)(schema_1.leads.id, id)).returning();
        if (!updatedLead)
            return res.status(404).json({ success: false, message: 'Lead not found.' });
        try {
            const adminName = req.user?.name || req.user?.email || 'System Admin';
            await db_1.db.insert(schema_1.auditLogs).values({
                performedBy: adminName,
                action: 'UPDATE_LEAD_STATUS',
                details: `Updated lead status for ${updatedLead.fullName} to ${status}`,
            });
        }
        catch (auditErr) {
            console.error('⚠️ AUDIT LOG UPDATE FAILED:', auditErr.message || auditErr);
        }
        return res.status(200).json({ success: true, message: 'Lead status updated successfully.', data: updatedLead });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to update lead status.' });
    }
};
exports.updateStatus = updateStatus;
const deleteLead = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const [deletedLead] = await db_1.db.delete(schema_1.leads).where((0, drizzle_orm_1.eq)(schema_1.leads.id, id)).returning();
        if (!deletedLead)
            return res.status(404).json({ success: false, message: 'Lead not found.' });
        try {
            const adminName = req.user?.name || req.user?.email || 'System Admin';
            await db_1.db.insert(schema_1.auditLogs).values({
                performedBy: adminName,
                action: 'DELETE_LEAD',
                details: `Deleted lead: ${deletedLead.fullName}`,
            });
        }
        catch (auditErr) {
            console.error('⚠️ AUDIT LOG DELETE FAILED:', auditErr.message || auditErr);
        }
        return res.status(200).json({ success: true, message: 'Lead deleted successfully.' });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to delete lead.' });
    }
};
exports.deleteLead = deleteLead;
