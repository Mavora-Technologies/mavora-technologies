"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInsightSchema = exports.createInsightSchema = void 0;
const zod_1 = require("zod");
exports.createInsightSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(2, "Title is required"),
        slug: zod_1.z.string().min(2, "Slug is required"),
        excerpt: zod_1.z.string().min(5, "Excerpt is required"),
        content: zod_1.z.string().min(10, "Content is required"),
        author: zod_1.z.string().min(2, "Author name is required"),
        category: zod_1.z.string().min(2, "Category is required"),
        coverImage: zod_1.z.string().optional(),
        published: zod_1.z.boolean().optional(),
    }),
});
exports.updateInsightSchema = zod_1.z.object({
    body: exports.createInsightSchema.shape.body.partial(),
});
