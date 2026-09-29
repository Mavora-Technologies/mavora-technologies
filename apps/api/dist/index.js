"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//apps/api/src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const index_js_1 = require("./db/index.js");
const schema_js_1 = require("./db/schema.js");
require("dotenv/config");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configure Nodemailer transporter using your SMTP environment variables
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
    },
});
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Mavora API is running successfully!' });
});
// 1. Leads Endpoint
app.post('/api/leads', async (req, res) => {
    try {
        const { fullName, email, phone, company, service, message, source } = req.body;
        if (!fullName || !email || !service) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }
        const newLead = await index_js_1.db.insert(schema_js_1.leads).values({
            fullName, email, phone, company, service, message, source: source || 'Website',
        }).returning();
        // Send email notification (non-blocking or caught)
        try {
            await transporter.sendMail({
                from: '"Mavora System" <no-reply@mavora.com>',
                to: process.env.NOTIFICATION_EMAIL || 'admin@mavora.com',
                subject: `🚀 New Lead: ${fullName} (${service})`,
                text: `You have a new lead!\n\nName: ${fullName}\nEmail: ${email}\nService: ${service}\nMessage: ${message || 'N/A'}`,
            });
        }
        catch (mailErr) {
            console.warn('⚠️ Failed to send email notification:', mailErr);
        }
        return res.status(201).json({ success: true, message: 'Thank you for reaching out! Your message has been received.', data: newLead[0] });
    }
    catch (error) {
        console.error('Error creating lead:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
// 2. Projects (Case Studies) Endpoint - Fetch all or featured
app.get('/api/projects', async (req, res) => {
    try {
        const allProjects = await index_js_1.db.select().from(schema_js_1.projects);
        return res.json({ success: true, data: allProjects });
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
// 3. Insights (Blog Posts) Endpoint - Fetch published articles
app.get('/api/insights', async (req, res) => {
    try {
        const allInsights = await index_js_1.db.select().from(schema_js_1.insights);
        return res.json({ success: true, data: allInsights });
    }
    catch (error) {
        console.error('Error fetching insights:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
// 4. Consultation Requests Endpoint
app.post('/api/consultations', async (req, res) => {
    try {
        const { consultationType, preferredDate, preferredTimeSlot, fullName, workEmail, companyName, phone, discussionTopics } = req.body;
        if (!consultationType || !preferredDate || !fullName || !workEmail) {
            return res.status(400).json({ success: false, error: 'Missing required consultation fields' });
        }
        const newConsultation = await index_js_1.db.insert(schema_js_1.consultationRequests).values({
            consultationType, preferredDate, preferredTimeSlot, fullName, workEmail, companyName, phone, discussionTopics,
        }).returning();
        return res.status(201).json({ success: true, message: 'Consultation booked successfully!', data: newConsultation[0] });
    }
    catch (error) {
        console.error('Error booking consultation:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.listen(PORT, () => {
    console.log(`🚀 Mavora API server running on port ${PORT}`);
});
