// apps/api/src/modules/leads/leads.routes.ts
import { Router } from 'express';
import { getLeads, getLead, createLead, updateStatus, deleteLead } from './leads.controller';
// import { authenticateAdmin } from '../../middlewares/auth.middleware'; // Uncomment when ready

const router = Router();

// Public route for form submissions from your frontend website
router.post('/', createLead);

// Protected admin management routes (add authenticateAdmin middleware if required)
router.get('/', getLeads);
router.get('/:id', getLead);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteLead);

export default router;