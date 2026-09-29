"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInsight = exports.updateInsight = exports.createInsight = exports.getInsightBySlug = exports.getInsights = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getInsights = async (req, res, next) => {
    try {
        const allInsights = await db_1.db.select().from(schema_1.insights);
        res.json({
            success: true,
            data: allInsights,
            message: 'Insights retrieved successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve insights', error: error.message });
    }
};
exports.getInsights = getInsights;
const getInsightBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const [insight] = await db_1.db.select().from(schema_1.insights).where((0, drizzle_orm_1.eq)(schema_1.insights.slug, slug));
        if (!insight) {
            res.status(404).json({ success: false, message: 'Insight article not found' });
            return;
        }
        res.json({
            success: true,
            data: insight,
            message: 'Insight retrieved successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve insight', error: error.message });
    }
};
exports.getInsightBySlug = getInsightBySlug;
const createInsight = async (req, res, next) => {
    try {
        const payload = req.body;
        const [newInsight] = await db_1.db.insert(schema_1.insights).values(payload).returning();
        res.status(201).json({
            success: true,
            data: newInsight,
            message: 'Insight created successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create insight', error: error.message });
    }
};
exports.createInsight = createInsight;
const updateInsight = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const [updatedInsight] = await db_1.db
            .update(schema_1.insights)
            .set({ ...payload, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.insights.id, id))
            .returning();
        if (!updatedInsight) {
            res.status(404).json({ success: false, message: 'Insight article not found' });
            return;
        }
        res.json({
            success: true,
            data: updatedInsight,
            message: 'Insight updated successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update insight', error: error.message });
    }
};
exports.updateInsight = updateInsight;
const deleteInsight = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [deletedInsight] = await db_1.db.delete(schema_1.insights).where((0, drizzle_orm_1.eq)(schema_1.insights.id, id)).returning();
        if (!deletedInsight) {
            res.status(404).json({ success: false, message: 'Insight article not found' });
            return;
        }
        res.json({
            success: true,
            data: deletedInsight,
            message: 'Insight deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete insight', error: error.message });
    }
};
exports.deleteInsight = deleteInsight;
