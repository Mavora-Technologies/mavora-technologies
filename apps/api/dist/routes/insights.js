"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// apps/api/src/routes/insights.ts
const express_1 = require("express");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const router = (0, express_1.Router)();
/**
 * GET /api/insights
 * Retrieves all articles/insights from the database.
 * Supports optional query param: ?category=Fintech Integration
 */
router.get('/', async (req, res) => {
    try {
        const categoryParam = req.query.category;
        const category = typeof categoryParam === 'string' ? categoryParam : undefined;
        let query;
        if (category && category.toLowerCase() !== 'all') {
            query = db_1.db
                .select()
                .from(schema_1.insights)
                .where((0, drizzle_orm_1.eq)(schema_1.insights.category, category));
        }
        else {
            query = db_1.db.select().from(schema_1.insights);
        }
        const results = await query;
        return res.status(200).json({
            success: true,
            count: results.length,
            data: results,
        });
    }
    catch (error) {
        console.error('Error fetching insights from database:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve insights',
        });
    }
});
/**
 * GET /api/insights/:slug
 * Retrieves a single article by its URL slug or ID.
 */
router.get('/:slug', async (req, res) => {
    try {
        // Explicitly coerce parameter to a single string
        const slugStr = String(req.params.slug);
        // 1. Search by slug
        let articleList = await db_1.db
            .select()
            .from(schema_1.insights)
            .where((0, drizzle_orm_1.eq)(schema_1.insights.slug, slugStr))
            .limit(1);
        // 2. Fallback: search by ID if slug yields no match
        if (articleList.length === 0) {
            articleList = await db_1.db
                .select()
                .from(schema_1.insights)
                .where((0, drizzle_orm_1.eq)(schema_1.insights.id, slugStr))
                .limit(1);
        }
        if (articleList.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Article not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: articleList[0],
        });
    }
    catch (error) {
        console.error('Error fetching article details:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve article details',
        });
    }
});
/**
 * POST /api/insights
 * Creates a new insight article (Admin route).
 */
router.post('/', async (req, res) => {
    try {
        const { title, slug, excerpt, content, author, category, cover_image, published } = req.body;
        if (!title || !slug || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title, slug, and content are required fields',
            });
        }
        const [newArticle] = await db_1.db
            .insert(schema_1.insights)
            .values({
            title,
            slug,
            excerpt,
            content,
            author: author || 'Mavora Team',
            category: category || 'General',
            coverImage: cover_image || '',
            published: published ?? true,
        })
            .returning();
        return res.status(201).json({
            success: true,
            message: 'Article created successfully',
            data: newArticle,
        });
    }
    catch (error) {
        console.error('Error creating article:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to create article',
        });
    }
});
/**
 * PUT /api/insights/:id
 * Updates an existing article by ID (Admin route).
 */
router.put('/:id', async (req, res) => {
    try {
        const idStr = String(req.params.id);
        const updateData = req.body;
        const [updatedArticle] = await db_1.db
            .update(schema_1.insights)
            .set({
            ...updateData,
            updatedAt: new Date(),
        })
            .where((0, drizzle_orm_1.eq)(schema_1.insights.id, idStr))
            .returning();
        if (!updatedArticle) {
            return res.status(404).json({
                success: false,
                message: 'Article not found for update',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Article updated successfully',
            data: updatedArticle,
        });
    }
    catch (error) {
        console.error('Error updating article:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to update article',
        });
    }
});
/**
 * DELETE /api/insights/:id
 * Deletes an article by ID (Admin route).
 */
router.delete('/:id', async (req, res) => {
    try {
        const idStr = String(req.params.id);
        const [deleted] = await db_1.db
            .delete(schema_1.insights)
            .where((0, drizzle_orm_1.eq)(schema_1.insights.id, idStr))
            .returning();
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Article not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Article deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting article:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete article',
        });
    }
});
exports.default = router;
