import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import projectsRouter from './routes/projects';
import insightsRouter from './routes/insights';
import leadsRouter from './routes/leads';
import { db } from './db';
import { projectRequests } from './db/schema';

const app = express();

// 1. Configure allowed origins (supports exact strings and regex)
const allowedOrigins = [
  'http://localhost:3000',
  'https://mavoratechnologies.com',
  'https://www.mavoratechnologies.com',
  'https://mavora-technologies.pages.dev',
  /\.mavora-technologies\.pages\.dev$/ // Matches any Cloudflare preview deployment
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// 2. Apply CORS middleware
app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests across all routes
app.options('*', cors(corsOptions));

app.use(express.json());

// 3. Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Mavora API is running' });
});

// 4. API Routes
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

// 5. 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// 6. Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled API Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default app;