import { Router } from 'express';
import { AuditLogsController } from './audit-logs.controller';
import { authenticateAdmin, requireRole } from '../../middleware/rbac.middleware';

const router = Router();
router.get('/', authenticateAdmin, requireRole(['SUPER_ADMIN', 'DEVELOPER']), AuditLogsController.getAuditLogs);

export default router;