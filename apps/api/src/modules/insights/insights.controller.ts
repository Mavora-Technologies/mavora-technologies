import { RequestHandler } from 'express';
import { db } from '../../db';
import { insights } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const getInsights: RequestHandler = async (req, res, next) => {
  try {
    const allInsights = await db.select().from(insights);
    res.json({
      success: true,
      data: allInsights,
      message: 'Insights retrieved successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve insights', error: error.message });
  }
};

export const getInsightBySlug: RequestHandler<{ slug: string }> = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const [insight] = await db.select().from(insights).where(eq(insights.slug, slug));
    
    if (!insight) {
      res.status(404).json({ success: false, message: 'Insight article not found' });
      return;
    }

    res.json({
      success: true,
      data: insight,
      message: 'Insight retrieved successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve insight', error: error.message });
  }
};

export const createInsight: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body as typeof insights.$inferInsert;
    const [newInsight] = await db.insert(insights).values(payload).returning();
    
    res.status(201).json({
      success: true,
      data: newInsight,
      message: 'Insight created successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create insight', error: error.message });
  }
};

export const updateInsight: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body as Partial<typeof insights.$inferInsert>;
    
    const [updatedInsight] = await db
      .update(insights)
      .set({ ...payload, updatedAt: new Date() })
      .where(eq(insights.id, id))
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
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update insight', error: error.message });
  }
};

export const deleteInsight: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [deletedInsight] = await db.delete(insights).where(eq(insights.id, id)).returning();

    if (!deletedInsight) {
      res.status(404).json({ success: false, message: 'Insight article not found' });
      return;
    }

    res.json({
      success: true,
      data: deletedInsight,
      message: 'Insight deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete insight', error: error.message });
  }
};