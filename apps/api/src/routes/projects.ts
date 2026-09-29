// apps/api/src/routes/projects.ts
import { Router, Request, Response } from 'express';
import { db } from '../db';
import { projects, projectRequests } from '../db/schema';

const router = Router();

// GET /api/projects
router.get('/', async (_req: Request, res: Response) => {
  try {
    const allProjects = await db.select().from(projects);
    return res.json({ success: true, data: allProjects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST /api/projects/request
router.post('/request', async (req: Request, res: Response) => {
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

export default router;