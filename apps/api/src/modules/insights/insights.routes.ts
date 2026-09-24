import { Router } from 'express';
import {
  getInsights,
  getInsightBySlug,
} from './insights.controller.js';
import { validate } from '../../middleware/validate.js';
import { createInsightSchema, updateInsightSchema } from './insights.validator.js';

const router = Router();

// GET /api/insights
router.get('/', getInsights);

// GET /api/insights/:slug
router.get('/:slug', getInsightBySlug);

export default router;