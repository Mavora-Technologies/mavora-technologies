"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifications = exports.auditLogs = exports.users = exports.userRoleEnum = exports.consultationRequests = exports.projectRequests = exports.insights = exports.projects = exports.leads = exports.leadStatusEnum = void 0;
//apps/api/src/db/schema.ts
const pg_core_1 = require("drizzle-orm/pg-core");
exports.leadStatusEnum = (0, pg_core_1.pgEnum)('lead_status', [
    'NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'
]);
exports.leads = (0, pg_core_1.pgTable)('leads', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    fullName: (0, pg_core_1.text)('full_name').notNull(),
    company: (0, pg_core_1.text)('company'),
    email: (0, pg_core_1.text)('email').notNull(),
    phone: (0, pg_core_1.text)('phone'),
    service: (0, pg_core_1.text)('service').notNull(),
    message: (0, pg_core_1.text)('message'),
    status: (0, exports.leadStatusEnum)('status').default('NEW').notNull(),
    source: (0, pg_core_1.text)('source').default('Website').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.projects = (0, pg_core_1.pgTable)('projects', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    title: (0, pg_core_1.text)('title').notNull(),
    slug: (0, pg_core_1.text)('slug').notNull().unique(),
    client: (0, pg_core_1.text)('client').notNull(),
    industry: (0, pg_core_1.text)('industry').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    challenge: (0, pg_core_1.text)('challenge').notNull(),
    solution: (0, pg_core_1.text)('solution').notNull(),
    results: (0, pg_core_1.text)('results').notNull(),
    featured: (0, pg_core_1.boolean)('featured').default(false).notNull(),
    coverImage: (0, pg_core_1.text)('cover_image'),
    technologies: (0, pg_core_1.jsonb)('technologies').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.insights = (0, pg_core_1.pgTable)('insights', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    title: (0, pg_core_1.text)('title').notNull(),
    slug: (0, pg_core_1.text)('slug').notNull().unique(),
    excerpt: (0, pg_core_1.text)('excerpt').notNull(),
    content: (0, pg_core_1.text)('content').notNull(), // Markdown or HTML content
    author: (0, pg_core_1.text)('author').notNull(),
    category: (0, pg_core_1.text)('category').notNull(),
    coverImage: (0, pg_core_1.text)('cover_image'),
    published: (0, pg_core_1.boolean)('published').default(false).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.projectRequests = (0, pg_core_1.pgTable)('project_requests', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    selectedServices: (0, pg_core_1.jsonb)('selected_services').notNull(),
    timeline: (0, pg_core_1.text)('timeline').notNull(),
    projectOverview: (0, pg_core_1.text)('project_overview').notNull(),
    fullName: (0, pg_core_1.text)('full_name').notNull(),
    workEmail: (0, pg_core_1.text)('work_email').notNull(),
    companyName: (0, pg_core_1.text)('company_name'),
    phone: (0, pg_core_1.text)('phone'),
    requestNda: (0, pg_core_1.boolean)('request_nda').default(true).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
exports.consultationRequests = (0, pg_core_1.pgTable)('consultation_requests', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    consultationType: (0, pg_core_1.text)('consultation_type').notNull(),
    preferredDate: (0, pg_core_1.text)('preferred_date').notNull(),
    preferredTimeSlot: (0, pg_core_1.text)('preferred_time_slot').notNull(),
    fullName: (0, pg_core_1.text)('full_name').notNull(),
    workEmail: (0, pg_core_1.text)('work_email').notNull(),
    companyName: (0, pg_core_1.text)('company_name'),
    phone: (0, pg_core_1.text)('phone'),
    discussionTopics: (0, pg_core_1.text)('discussion_topics').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
exports.userRoleEnum = (0, pg_core_1.pgEnum)('user_role', [
    'SUPER_ADMIN', 'DEVELOPER', 'SOFTWARE_ENGINEER', 'SALES', 'RECEPTION'
]);
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.text)('name').notNull(),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    passwordHash: (0, pg_core_1.text)('password_hash').notNull(),
    role: (0, exports.userRoleEnum)('role').default('SOFTWARE_ENGINEER').notNull(),
    jobTitle: (0, pg_core_1.text)('job_title'),
    status: (0, pg_core_1.text)('status').default('ACTIVE').notNull(),
    lastLogin: (0, pg_core_1.timestamp)('last_login'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.auditLogs = (0, pg_core_1.pgTable)('audit_logs', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id'),
    userName: (0, pg_core_1.text)('user_name').notNull(),
    action: (0, pg_core_1.text)('action').notNull(), // e.g. LOGIN, UPDATE_LEAD, CREATE_INSIGHT
    details: (0, pg_core_1.text)('details').notNull(),
    ipAddress: (0, pg_core_1.text)('ip_address'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
exports.notifications = (0, pg_core_1.pgTable)('notifications', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    title: (0, pg_core_1.text)('title').notNull(),
    message: (0, pg_core_1.text)('message').notNull(),
    type: (0, pg_core_1.text)('type').notNull(), // e.g. LEAD, PROJECT_REQUEST, CONSULTATION, SYSTEM
    read: (0, pg_core_1.boolean)('read').default(false).notNull(),
    referenceId: (0, pg_core_1.uuid)('reference_id'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
