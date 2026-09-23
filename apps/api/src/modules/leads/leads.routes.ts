import { Router } from 'express';
import { createLead } from './leads.controller';
import { validate } from '../../middleware/validate';
import { createLeadSchema } from './leads.validator';

const router = Router();
router.post('/', validate(createLeadSchema), createLead);

export default router;