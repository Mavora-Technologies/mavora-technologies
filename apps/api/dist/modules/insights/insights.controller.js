import { eq } from 'drizzle-orm'; // <-- Ensure eq is imported from drizzle-orm
import { db } from '../../db/index.js';
import { insights } from '../../db/schema.js';
// GET /api/insights - Retrieve all insights or filter by category
export const getInsights = async (req, res, next) => {
    try {
        const category = req.query.category;
        if (category && category !== 'all') {
            const result = await db
                .select()
                .from(insights)
                .where(eq(insights.category, category));
            return res.status(200).json({
                success: true,
                count: result.length,
                data: result,
            });
        }
        const allInsights = await db.select().from(insights);
        return res.status(200).json({
            success: true,
            count: allInsights.length,
            data: allInsights,
        });
    }
    catch (error) {
        console.error('❌ Error fetching insights:', error);
        return next(error);
    }
};
// GET /api/insights/:slug - Retrieve single insight by slug
export const getInsightBySlug = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        if (!slug) {
            return res.status(400).json({
                success: false,
                message: 'Slug parameter is required',
            });
        }
        const [article] = await db
            .select()
            .from(insights)
            .where(eq(insights.slug, slug))
            .limit(1);
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: article,
        });
    }
    catch (error) {
        console.error('❌ Error fetching insight by slug:', error);
        return next(error);
    }
};
