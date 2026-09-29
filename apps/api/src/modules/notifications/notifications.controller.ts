import { Response } from 'express';
import { NotificationsService } from './notifications.service';
import { AuthenticatedRequest } from '../../middleware/rbac.middleware';

export class NotificationsController {
  static async getAll(req: AuthenticatedRequest, res: Response) {
    try {
      const list = await NotificationsService.getRecentNotifications();
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to fetch notifications.' });
    }
  }

  static async markRead(req: AuthenticatedRequest, res: Response) {
    try {
      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? idParam[0] : idParam;
      const updated = await NotificationsService.markAsRead(id);
      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to update notification.' });
    }
  }
}