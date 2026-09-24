import { Router } from 'express';
import { createLead } from './leads.controller.js';
import { validate } from '../../middleware/validate.js';
import { createLeadSchema } from './leads.validator.js';
const router = Router();
// POST /api/leads
router.post('/', validate(createLeadSchema), createLead);
export default router;
