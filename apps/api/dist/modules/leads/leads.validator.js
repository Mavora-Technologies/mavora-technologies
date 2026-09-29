"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLeadSchema = void 0;
const zod_1 = require("zod");
exports.createLeadSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, 'Full name is required'),
    email: zod_1.z.string().email('A valid email address is required'),
    company: zod_1.z.string().optional().nullable(),
    phone: zod_1.z.string().optional().nullable(),
    service: zod_1.z.string().min(1, 'Service is required'),
    message: zod_1.z.string().min(1, 'Message is required'),
    source: zod_1.z.string().optional(),
});
