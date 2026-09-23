import { Router, Request, Response } from 'express';
import { INSIGHTS_DATA, InsightItem } from '../data/mockData';

const router = Router();

// GET /api/insights - Retrieve all articles/insights
router.get('/', (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    let results: InsightItem[] = INSIGHTS_DATA;

    if (category && typeof category === 'string' && category !== 'all') {
      results = INSIGHTS_DATA.filter(
        (i) => i.category.toLowerCase() === category.toLowerCase()
      );
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve insights',
    });
  }
});

// GET /api/insights/:slug - Retrieve single article by slug
router.get('/:slug', (req: Request, res: Response) => {
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
  } catch (error) {
    console.error('Error fetching article:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve article details',
    });
  }
});

export default router;