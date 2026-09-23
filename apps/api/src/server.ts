import express, { Request, Response, NextFunction } from 'express';
import projectsRouter from './routes/projects';
import insightsRouter from './routes/insights';
import leadsRouter from './routes/leads';
import { db } from './db';
import { projectRequests } from './db/schema';

const app = express();

// 1. Raw CORS Middleware (Runs BEFORE any database connection or routing)
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:3000',
    'https://mavoratechnologies.com',
    'https://www.mavoratechnologies.com',
    'https://mavora-technologies.pages.dev',
  ];

  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.mavora-technologies.pages.dev'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://mavoratechnologies.com');
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

  // Immediately fulfill browser preflight checks
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

// 2. Health Check
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

// Consultation Request Endpoint
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

    return res.status(201).json({ 
      success: true, 
      message: 'Consultation request received successfully' 
    });
  } catch (error) {
    console.error('Error saving consultation request:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 4. 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// 5. Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled API Error:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Mavora API Server running at http://localhost:${PORT}`);
  });
}

export default app;