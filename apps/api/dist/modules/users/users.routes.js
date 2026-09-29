"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// apps/api/src/modules/users/users.routes.ts
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const router = (0, express_1.Router)();
// Only Super Admins, Developers, or authorized staff can view user listings
router.get('/', rbac_middleware_1.authenticateAdmin, (0, rbac_middleware_1.requireRole)(['SUPER_ADMIN', 'DEVELOPER', 'SOFTWARE_ENGINEER']), users_controller_1.UsersController.getUsers);
router.get('/profile', rbac_middleware_1.authenticateAdmin, users_controller_1.UsersController.getUserProfile);
// Route to create a new admin user and record the action in the audit logs
router.post('/', rbac_middleware_1.authenticateAdmin, (0, rbac_middleware_1.requireRole)(['SUPER_ADMIN', 'DEVELOPER']), users_controller_1.UsersController.createUser);
exports.default = router;
