// apps/api/src/modules/users/users.routes.ts
import { Router } from 'express';
import { UsersController } from './users.controller';
import { authenticateAdmin, requireRole } from '../../middleware/rbac.middleware';

const router = Router();

// Only Super Admins, Developers, or authorized staff can view user listings
router.get('/', authenticateAdmin, requireRole(['SUPER_ADMIN', 'DEVELOPER', 'SOFTWARE_ENGINEER']), UsersController.getUsers);
router.get('/profile', authenticateAdmin, UsersController.getUserProfile);

// Route to create a new admin user and record the action in the audit logs
router.post('/', authenticateAdmin, requireRole(['SUPER_ADMIN', 'DEVELOPER']), UsersController.createUser);

export default router;