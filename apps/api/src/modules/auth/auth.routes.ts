import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authenticateAdmin } from '../../middleware/rbac.middleware';

const router = Router();

router.post('/login', AuthController.login);
router.post('/logout', authenticateAdmin, AuthController.logout);
router.get('/me', authenticateAdmin, AuthController.me);

export default router;