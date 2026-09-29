"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const audit_logs_controller_1 = require("./audit-logs.controller");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const router = (0, express_1.Router)();
router.get('/', rbac_middleware_1.authenticateAdmin, (0, rbac_middleware_1.requireRole)(['SUPER_ADMIN', 'DEVELOPER']), audit_logs_controller_1.AuditLogsController.getAuditLogs);
exports.default = router;
