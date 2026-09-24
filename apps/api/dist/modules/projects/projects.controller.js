import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { projects } from '../../db/schema.js';
// GET /api/projects - Retrieve all projects
export const getProjects = async (req, res, next) => {
    try {
        const allProjects = await db.select().from(projects);
        return res.status(200).json({
            success: true,
            count: allProjects.length,
            data: allProjects,
        });
    }
    catch (error) {
        console.error('❌ Error fetching projects:', error);
        return next(error);
    }
};
// GET /api/projects/:slug - Retrieve single project by slug
export const getProjectBySlug = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        if (!slug) {
            return res.status(400).json({
                success: false,
                message: 'Slug parameter is required',
            });
        }
        const [project] = await db
            .select()
            .from(projects)
            .where(eq(projects.slug, slug))
            .limit(1);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        console.error('❌ Error fetching project by slug:', error);
        return next(error);
    }
};
