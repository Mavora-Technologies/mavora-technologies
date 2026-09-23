import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import projectsRouter from './routes/projects';
import insightsRouter from './routes/insights';
import leadsRouter from './routes/leads';
import { db } from './db';
import { projectRequests } from './db/schema';

const app = express();

// 1. Core Middlewares
app.use(cors());
app.use(express.json());

// 2. Health Check / Root Endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Mavora API is running' });
});

// 3. API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/insights', insightsRouter);
app.use('/api/leads', leadsRouter);

// Project Request Endpoint
app.post('/api/projects/request', async (req: Request, res: Response) => {
  try {
    const { 
      selectedServices, 
      timeline, 
      projectOverview, 
      fullName, 
      workEmail, 
      companyName, 
      phone, 
      requestNda 
    } = req.body;

    if (!fullName || !workEmail || !projectOverview || !selectedServices?.length) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const [newRequest] = await db.insert(projectRequests).values({
      selectedServices,
      timeline,
      projectOverview,
      fullName,
      workEmail,
      companyName,
      phone,
      requestNda,
    }).returning();

    return res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    console.error('Error saving project request:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Consultation Request Endpoint (Added to fix your 404 error)
app.post('/api/consultation/request', async (req: Request, res: Response) => {
  try {
    const { 
      fullName, 
      workEmail, 
      companyName, 
      phone, 
      preferredDate, 
      preferredTimeSlot, 
      consultationType, 
      discussionTopics 
    } = req.body;

    if (!fullName || !workEmail || !preferredDate || !discussionTopics) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    console.log('Consultation request received:', req.body);

    // If you want to save this to your database later, you can add your Drizzle insert here.

    return res.status(201).json({ 
      success: true, 
      message: 'Consultation request received successfully' 
    });
  } catch (error) {
    console.error('Error saving consultation request:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 4. 404 Handler (Unmatched Routes)
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// 5. Global Error Handling Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled API Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// 6. Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Mavora API Server running at http://localhost:${PORT}`);
  console.log(`   - Projects: http://localhost:${PORT}/api/projects`);
  console.log(`   - Insights: http://localhost:${PORT}/api/insights`);
  console.log(`   - Leads:    http://localhost:${PORT}/api/leads`);
  console.log(`   - Project Requests: http://localhost:${PORT}/api/projects/request`);
  console.log(`   - Consultation Requests: http://localhost:${PORT}/api/consultation/request`);
});