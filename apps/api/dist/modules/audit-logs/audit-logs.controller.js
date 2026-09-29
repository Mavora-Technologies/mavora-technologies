"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsController = void 0;
const audit_logs_service_1 = require("./audit-logs.service");
class AuditLogsController {
    static async getAuditLogs(req, res) {
        try {
            const logs = await audit_logs_service_1.AuditLogsService.getLogs();
            return res.status(200).json({ success: true, data: logs });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch audit logs.' });
        }
    }
}
exports.AuditLogsController = AuditLogsController;
