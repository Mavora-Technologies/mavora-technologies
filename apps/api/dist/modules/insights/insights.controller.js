import { eq, and, desc } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { insights } from '../../db/schema.js';
// Helper to compute reading time dynamically from content word count
function calculateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return `${minutes} min read`;
}
// GET /api/insights - Public: Retrieve all published insights
export const getInsights = async (req, res, next) => {
    try {
        const { category } = req.query;
        const baseCondition = eq(insights.published, true);
        const filterCondition = category && typeof category === 'string' && category !== 'all'
            ? and(baseCondition, eq(insights.category, category))
            : baseCondition;
        const records = await db
            .select()
            .from(insights)
            .where(filterCondition)
            .orderBy(desc(insights.createdAt));
        const formattedData = records.map((item) => ({
            ...item,
            readTime: calculateReadTime(item.content),
        }));
        return res.status(200).json({
            success: true,
            data: formattedData,
        });
    }
    catch (error) {
        console.error('❌ Error fetching insights:', error);
        return res.status(500).json({
            success: false,
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Something went wrong fetching insights',
            },
        });
    }
};
// GET /api/insights/:slug - Public: Retrieve single published insight by slug
export const getInsightBySlug = async (req, res, next) => {
    try {
        const slugParam = req.params.slug;
        const [article] = await db
            .select()
            .from(insights)
            .where(and(eq(insights.slug, slugParam), eq(insights.published, true)))
            .limit(1);
        if (!article) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Insight not found',
                },
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                ...article,
                readTime: calculateReadTime(article.content),
            },
        });
    }
    catch (error) {
        console.error('❌ Error fetching insight by slug:', error);
        return res.status(500).json({
            success: false,
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Something went wrong fetching article detail',
            },
        });
    }
};
// POST /api/insights - Admin: Create a new insight
export const createInsight = async (req, res, next) => {
    try {
        const body = req.body;
        const [existing] = await db
            .select()
            .from(insights)
            .where(eq(insights.slug, body.slug))
            .limit(1);
        if (existing) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'An article with this slug already exists',
                },
            });
        }
        const [newArticle] = await db
            .insert(insights)
            .values({
            title: body.title,
            slug: body.slug,
            excerpt: body.excerpt,
            content: body.content,
            author: body.author,
            category: body.category,
            coverImage: body.coverImage ?? null,
            published: body.published ?? false,
            featured: body.featured ?? false,
        })
            .returning();
        return res.status(201).json({
            success: true,
            data: {
                ...newArticle,
                readTime: calculateReadTime(newArticle.content),
            },
        });
    }
    catch (error) {
        console.error('❌ Error creating insight:', error);
        return res.status(500).json({
            success: false,
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Something went wrong creating insight',
            },
        });
    }
};
