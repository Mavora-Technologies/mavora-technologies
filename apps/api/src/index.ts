import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { db } from './db/index.js';
import { leads, projects, insights, consultationRequests as consultation_requests } from './db/schema.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure Nodemailer transporter using your SMTP environment variables
const transporter = nodemailer.createTransport({
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

    const newLead = await db.insert(leads).values({
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
    } catch (mailErr) {
      console.warn('⚠️ Failed to send email notification:', mailErr);
    }

    return res.status(201).json({ success: true, message: 'Thank you for reaching out! Your message has been received.', data: newLead[0] });
  } catch (error) {
    console.error('Error creating lead:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// 2. Projects (Case Studies) Endpoint - Fetch all or featured
app.get('/api/projects', async (req, res) => {
  try {
    const allProjects = await db.select().from(projects);
    return res.json({ success: true, data: allProjects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// 3. Insights (Blog Posts) Endpoint - Fetch published articles
app.get('/api/insights', async (req, res) => {
  try {
    const allInsights = await db.select().from(insights);
    return res.json({ success: true, data: allInsights });
  } catch (error) {
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

    const newConsultation = await db.insert(consultation_requests).values({
      consultationType, preferredDate, preferredTimeSlot, fullName, workEmail, companyName, phone, discussionTopics,
    }).returning();

    return res.status(201).json({ success: true, message: 'Consultation booked successfully!', data: newConsultation[0] });
  } catch (error) {
    console.error('Error booking consultation:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Mavora API server running on port ${PORT}`);
});