"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notifications_controller_1 = require("./notifications.controller");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const router = (0, express_1.Router)();
router.get('/', rbac_middleware_1.authenticateAdmin, notifications_controller_1.NotificationsController.getAll);
router.patch('/:id/read', rbac_middleware_1.authenticateAdmin, notifications_controller_1.NotificationsController.markRead);
exports.default = router;
