import { Router } from 'express';
import { db } from '../db';
import { projectRequests } from '../db/schema';

const router = Router();

router.post('/', async (req, res) => {
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

    // Basic validation
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
    console.error('Database Error saving project request:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to submit project request due to a server error.' 
    });
  }
});

export default router;