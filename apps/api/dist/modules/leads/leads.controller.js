import { db } from '../../db/index.js';
import { leads } from '../../db/schema.js';
import { sendLeadConfirmationEmail } from '../../services/email.js';
export const createLead = async (req, res, next) => {
    try {
        const body = req.body;
        const [newLead] = await db
            .insert(leads)
            .values({
            fullName: body.fullName,
            email: body.email,
            company: body.company ?? null,
            phone: body.phone ?? null,
            service: body.service,
            message: body.message,
            status: 'NEW',
            source: body.source ?? 'Website Contact Form',
        })
            .returning();
        // Trigger confirmation email asynchronously
        sendLeadConfirmationEmail(body.email, body.fullName).catch((err) => console.error('Async email error:', err));
        return res.status(201).json({
            success: true,
            message: 'Lead recorded successfully',
            data: newLead,
        });
    }
    catch (error) {
        console.error('❌ Error creating lead:', error);
        return next(error);
    }
};
