import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import projectsRouter from './routes/projects';
import insightsRouter from './routes/insights';
import leadsRouter from './routes/leads';
import consultationsRouter from './routes/consultations';
import authRouter from './modules/auth/auth.routes';
import usersRouter from './modules/users/users.routes';
import notificationsRouter from './modules/notifications/notifications.routes';
import auditLogsRouter from './modules/audit-logs/audit-logs.routes';
import { db } from './db';
import { projectRequests } from './db/schema';
import 'dotenv/config';

const app = express();

// Allowed Origins List
const allowedOrigins = [
  'http://localhost:3000',
  'https://mavoratechnologies.com',
  'https://www.mavoratechnologies.com',
  'https://mavora-technologies.pages.dev',
];

// Configure standard CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.mavora-technologies.pages.dev')
      ) {
        return callback(null, true);
      } else {
        return callback(null, true); // Or callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
);

// Explicitly handle preflight OPTIONS requests globally
app.options('*', cors() as any);

app.use(express.json());

// Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Mavora API is running' });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/insights', insightsRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/consultations', consultationsRouter);
app.use('/api/consultation', consultationsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/audit-logs', auditLogsRouter);

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

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Global Error Handler
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