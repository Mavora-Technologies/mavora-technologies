"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// apps/api/src/routes/projects.ts
const express_1 = require("express");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const router = (0, express_1.Router)();
// GET /api/projects
router.get('/', async (_req, res) => {
    try {
        const allProjects = await db_1.db.select().from(schema_1.projects);
        return res.json({ success: true, data: allProjects });
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
// POST /api/projects/request
router.post('/request', async (req, res) => {
    try {
        const { selectedServices, timeline, projectOverview, fullName, workEmail, companyName, phone, requestNda } = req.body;
        if (!fullName || !workEmail || !projectOverview || !selectedServices?.length) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        const [newRequest] = await db_1.db.insert(schema_1.projectRequests).values({
            selectedServices,
            timeline,
            projectOverview,
            fullName,
            workEmail,
            companyName,
            phone,
            requestNda,
        }).returning();
        return res.status(201).json({ success: true, data: newRequest });
    }
    catch (error) {
        console.error('Error saving project request:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.default = router;
