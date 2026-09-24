import { Router } from 'express';
import { INSIGHTS_DATA } from '../data/mockData.js';
const router = Router();
// GET /api/insights - Retrieve all articles/insights
router.get('/', (req, res, next) => {
    try {
        const { category } = req.query;
        let results = INSIGHTS_DATA;
        if (category && typeof category === 'string' && category !== 'all') {
            results = INSIGHTS_DATA.filter((i) => i.category.toLowerCase() === category.toLowerCase());
        }
        return res.status(200).json({
            success: true,
            count: results.length,
            data: results,
        });
    }
    catch (error) {
        console.error('❌ Error fetching insights:', error);
        return next(error);
    }
});
// GET /api/insights/:slug - Retrieve single article by slug
router.get('/:slug', (req, res, next) => {
    try {
        const { slug } = req.params;
        const article = INSIGHTS_DATA.find((item) => item.slug === slug);
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
        console.error('❌ Error fetching article:', error);
        return next(error);
    }
});
export default router;
