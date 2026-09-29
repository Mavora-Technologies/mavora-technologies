"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const { selectedServices, timeline, projectOverview, fullName, workEmail, companyName, phone, requestNda } = req.body;
        // Basic validation
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
        console.error('Database Error saving project request:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to submit project request due to a server error.'
        });
    }
});
exports.default = router;
