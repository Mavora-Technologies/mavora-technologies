import { RequestHandler } from 'express';
import { db } from '../../db';
import { projects } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const getProjects: RequestHandler = async (req, res, next) => {
  try {
    const allProjects = await db.select().from(projects);
    res.json({
      success: true,
      data: allProjects,
      message: 'Projects retrieved successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve projects', error: error.message });
  }
};

// Added <{ slug: string }> to strictly type req.params.slug
export const getProjectBySlug: RequestHandler<{ slug: string }> = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.json({
      success: true,
      data: project,
      message: 'Project retrieved successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve project', error: error.message });
  }
};

export const createProject: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body as typeof projects.$inferInsert;
    const [newProject] = await db.insert(projects).values(payload).returning();
    
    res.status(201).json({
      success: true,
      data: newProject,
      message: 'Project created successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create project', error: error.message });
  }
};

// Added <{ id: string }> to strictly type req.params.id
export const updateProject: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body as Partial<typeof projects.$inferInsert>;
    
    const [updatedProject] = await db
      .update(projects)
      .set({ ...payload, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();

    if (!updatedProject) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.json({
      success: true,
      data: updatedProject,
      message: 'Project updated successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update project', error: error.message });
  }
};

// Added <{ id: string }> to strictly type req.params.id
export const deleteProject: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [deletedProject] = await db.delete(projects).where(eq(projects.id, id)).returning();

    if (!deletedProject) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.json({
      success: true,
      data: deletedProject,
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete project', error: error.message });
  }
};