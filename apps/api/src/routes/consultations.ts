import { Router } from 'express';
import { db } from '../db';
import { consultationRequests } from '../db/schema';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { 
      consultationType, 
      preferredDate, 
      preferredTimeSlot, 
      fullName, 
      workEmail, 
      companyName, 
      phone,
      discussionTopics 
    } = req.body;

    // Validate all fields that are marked as .notNull() in your Drizzle schema
    if (!fullName || !workEmail || !consultationType || !preferredDate || !preferredTimeSlot || !discussionTopics) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required consultation fields' 
      });
    }

    const [newConsultation] = await db.insert(consultationRequests).values({
      consultationType,
      preferredDate,
      preferredTimeSlot,
      fullName,
      workEmail,
      companyName: companyName || null,
      phone: phone || null,
      discussionTopics,
    }).returning();

    return res.status(201).json({ success: true, data: newConsultation });
  } catch (error) {
    console.error('Database Error saving consultation request:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to submit consultation request due to a server error.' 
    });
  }
});

export default router;