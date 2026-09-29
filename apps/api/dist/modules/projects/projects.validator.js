"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(2, "Title is required"),
        slug: zod_1.z.string().min(2, "Slug is required"),
        client: zod_1.z.string().min(2, "Client name is required"),
        industry: zod_1.z.string().min(2, "Industry is required"),
        description: zod_1.z.string().min(5, "Description is required"),
        challenge: zod_1.z.string().min(5, "Challenge details are required"),
        solution: zod_1.z.string().min(5, "Solution details are required"),
        results: zod_1.z.string().min(5, "Results metrics are required"),
        featured: zod_1.z.boolean().optional(),
        coverImage: zod_1.z.string().optional(),
        technologies: zod_1.z.array(zod_1.z.string()),
    }),
});
exports.updateProjectSchema = zod_1.z.object({
    body: exports.createProjectSchema.shape.body.partial(),
});
