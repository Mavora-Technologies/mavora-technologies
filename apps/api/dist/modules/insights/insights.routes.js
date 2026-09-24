import { Router } from 'express';
import { getInsights, getInsightBySlug, createInsight, } from './insights.controller.js';
import { validate } from '../../middleware/validate.js';
import { createInsightSchema } from './insights.validator.js';
const router = Router();
// GET /api/insights - Retrieve published insights
router.get('/', getInsights);
// GET /api/insights/:slug - Retrieve single published insight by slug
router.get('/:slug', getInsightBySlug);
// POST /api/insights - Create new insight (Admin/Internal)
router.post('/', validate(createInsightSchema), createInsight);
export default router;
