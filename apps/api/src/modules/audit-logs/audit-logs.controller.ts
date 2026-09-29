import { Response } from 'express';
import { AuditLogsService } from './audit-logs.service';
import { AuthenticatedRequest } from '../../middleware/rbac.middleware';

export class AuditLogsController {
  static async getAuditLogs(req: AuthenticatedRequest, res: Response) {
    try {
      const logs = await AuditLogsService.getLogs();
      return res.status(200).json({ success: true, data: logs });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to fetch audit logs.' });
    }
  }
}