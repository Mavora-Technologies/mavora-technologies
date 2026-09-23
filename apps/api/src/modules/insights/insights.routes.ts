import { Router } from 'express';
import { 
  getInsights, 
  getInsightBySlug, 
  createInsight, 
  updateInsight, 
  deleteInsight 
} from './insights.controller';
import { validate } from '../../middleware/validate';
import { createInsightSchema, updateInsightSchema } from './insights.validator';

const router = Router();

router.get('/', getInsights);
router.get('/:slug', getInsightBySlug);
router.post('/', validate(createInsightSchema), createInsight);
router.put('/:id', validate(updateInsightSchema), updateInsight);
router.delete('/:id', deleteInsight);
export default router;