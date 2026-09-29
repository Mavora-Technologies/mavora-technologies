"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectBySlug = exports.getProjects = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getProjects = async (req, res, next) => {
    try {
        const allProjects = await db_1.db.select().from(schema_1.projects);
        res.json({
            success: true,
            data: allProjects,
            message: 'Projects retrieved successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve projects', error: error.message });
    }
};
exports.getProjects = getProjects;
// Added <{ slug: string }> to strictly type req.params.slug
const getProjectBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const [project] = await db_1.db.select().from(schema_1.projects).where((0, drizzle_orm_1.eq)(schema_1.projects.slug, slug));
        if (!project) {
            res.status(404).json({ success: false, message: 'Project not found' });
            return;
        }
        res.json({
            success: true,
            data: project,
            message: 'Project retrieved successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve project', error: error.message });
    }
};
exports.getProjectBySlug = getProjectBySlug;
const createProject = async (req, res, next) => {
    try {
        const payload = req.body;
        const [newProject] = await db_1.db.insert(schema_1.projects).values(payload).returning();
        res.status(201).json({
            success: true,
            data: newProject,
            message: 'Project created successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create project', error: error.message });
    }
};
exports.createProject = createProject;
// Added <{ id: string }> to strictly type req.params.id
const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const [updatedProject] = await db_1.db
            .update(schema_1.projects)
            .set({ ...payload, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.projects.id, id))
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update project', error: error.message });
    }
};
exports.updateProject = updateProject;
// Added <{ id: string }> to strictly type req.params.id
const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [deletedProject] = await db_1.db.delete(schema_1.projects).where((0, drizzle_orm_1.eq)(schema_1.projects.id, id)).returning();
        if (!deletedProject) {
            res.status(404).json({ success: false, message: 'Project not found' });
            return;
        }
        res.json({
            success: true,
            data: deletedProject,
            message: 'Project deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete project', error: error.message });
    }
};
exports.deleteProject = deleteProject;
