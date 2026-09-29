"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const notifications_service_1 = require("./notifications.service");
class NotificationsController {
    static async getAll(req, res) {
        try {
            const list = await notifications_service_1.NotificationsService.getRecentNotifications();
            return res.status(200).json({ success: true, data: list });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch notifications.' });
        }
    }
    static async markRead(req, res) {
        try {
            const idParam = req.params.id;
            const id = Array.isArray(idParam) ? idParam[0] : idParam;
            const updated = await notifications_service_1.NotificationsService.markAsRead(id);
            return res.status(200).json({ success: true, data: updated });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to update notification.' });
        }
    }
}
exports.NotificationsController = NotificationsController;
