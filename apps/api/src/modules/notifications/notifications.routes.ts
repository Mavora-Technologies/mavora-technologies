import { Router } from 'express';
import { NotificationsController } from './notifications.controller';
import { authenticateAdmin } from '../../middleware/rbac.middleware';

const router = Router();
router.get('/', authenticateAdmin, NotificationsController.getAll);
router.patch('/:id/read', authenticateAdmin, NotificationsController.markRead);

export default router;