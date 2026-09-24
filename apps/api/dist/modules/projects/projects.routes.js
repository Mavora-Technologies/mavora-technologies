import { Router } from 'express';
import { getProjects, getProjectBySlug, } from './projects.controller.js';
const router = Router();
// GET /api/projects
router.get('/', getProjects);
// GET /api/projects/:slug
router.get('/:slug', getProjectBySlug);
export default router;
