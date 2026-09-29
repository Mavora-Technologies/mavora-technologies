"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// apps/api/src/modules/leads/leads.routes.ts
const express_1 = require("express");
const leads_controller_1 = require("./leads.controller");
// import { authenticateAdmin } from '../../middlewares/auth.middleware'; // Uncomment when ready
const router = (0, express_1.Router)();
// Public route for form submissions from your frontend website
router.post('/', leads_controller_1.createLead);
// Protected admin management routes (add authenticateAdmin middleware if required)
router.get('/', leads_controller_1.getLeads);
router.get('/:id', leads_controller_1.getLead);
router.patch('/:id/status', leads_controller_1.updateStatus);
router.delete('/:id', leads_controller_1.deleteLead);
exports.default = router;
