"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// apps/api/src/routes/consultations.ts
const express_1 = require("express");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const router = (0, express_1.Router)();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 1. GET /api/consultations - Fetch all consultation requests for the Admin Portal
router.get('/', async (_req, res) => {
    try {
        const allConsultations = await db_1.db.select().from(schema_1.consultationRequests);
        return res.status(200).json({ success: true, data: allConsultations });
    }
    catch (error) {
        console.error('❌ Error fetching consultations from database:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching consultations.',
            errorDetail: error?.message || String(error),
        });
    }
});
// 2. POST /api/consultations/request (and handler for /api/consultation/request)
const handleConsultationSubmission = async (req, res) => {
    console.log('📥 INCOMING CONSULTATION PAYLOAD:', req.body);
    try {
        const body = req.body || {};
        const fullName = body.fullName || body.name;
        const workEmail = body.workEmail || body.email;
        const companyName = body.companyName || body.company;
        const phone = body.phone;
        const consultationType = body.consultationType || 'discovery';
        const preferredDate = body.preferredDate;
        const preferredTimeSlot = body.preferredTimeSlot || 'Morning (09:00 AM - 12:00 PM EAT)';
        const discussionTopics = body.discussionTopics || body.message;
        // Validation checks
        if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
            return res.status(400).json({ success: false, message: 'Full name is required.' });
        }
        if (!workEmail || typeof workEmail !== 'string' || !EMAIL_REGEX.test(workEmail.trim())) {
            return res.status(400).json({ success: false, message: 'A valid corporate email is required.' });
        }
        if (!preferredDate) {
            return res.status(400).json({ success: false, message: 'Preferred date is required.' });
        }
        if (!discussionTopics || typeof discussionTopics !== 'string' || discussionTopics.trim() === '') {
            return res.status(400).json({ success: false, message: 'Discussion topics are required.' });
        }
        // Insert into database using Drizzle
        const [newConsultation] = await db_1.db.insert(schema_1.consultationRequests).values({
            consultationType: consultationType.trim(),
            preferredDate: preferredDate.trim(),
            preferredTimeSlot: preferredTimeSlot.trim(),
            fullName: fullName.trim(),
            workEmail: workEmail.trim().toLowerCase(),
            companyName: companyName ? companyName.trim() : null,
            phone: phone ? String(phone).trim() : null,
            discussionTopics: discussionTopics.trim(),
        }).returning();
        return res.status(201).json({
            success: true,
            message: 'Consultation request received successfully',
            data: newConsultation,
        });
    }
    catch (error) {
        console.error('❌ Database Error saving consultation:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to submit consultation request due to a server error.',
            errorDetail: error?.message || String(error),
        });
    }
};
router.post('/request', handleConsultationSubmission);
router.post('/', handleConsultationSubmission);
// 3. PATCH /api/consultations/:id/status - Update consultation status (if status column is added or handled)
router.patch('/:id/status', async (req, res) => {
    try {
        const consultationId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required.' });
        }
        const [updated] = await db_1.db
            .update(schema_1.consultationRequests)
            .set({ consultationType: status.trim() }) // Or update status if field exists
            .where((0, drizzle_orm_1.eq)(schema_1.consultationRequests.id, consultationId))
            .returning();
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Consultation request not found.' });
        }
        return res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        console.error('❌ Error updating consultation:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});
// 4. DELETE /api/consultations/:id - Delete a consultation request
router.delete('/:id', async (req, res) => {
    try {
        const consultationId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const [deleted] = await db_1.db
            .delete(schema_1.consultationRequests)
            .where((0, drizzle_orm_1.eq)(schema_1.consultationRequests.id, consultationId))
            .returning();
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Consultation request not found.' });
        }
        return res.status(200).json({ success: true, message: 'Consultation deleted successfully.' });
    }
    catch (error) {
        console.error('❌ Error deleting consultation:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});
exports.default = router;
