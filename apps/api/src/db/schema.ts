//apps/api/src/db/schema.ts
import { pgTable, uuid, text, timestamp, boolean, jsonb, pgEnum } from 'drizzle-orm/pg-core';

export const leadStatusEnum = pgEnum('lead_status', [
  'NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'
]);

export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: text('full_name').notNull(),
  company: text('company'),
  email: text('email').notNull(),
  phone: text('phone'),
  service: text('service').notNull(),
  message: text('message'),
  status: leadStatusEnum('status').default('NEW').notNull(),
  source: text('source').default('Website').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  client: text('client').notNull(),
  industry: text('industry').notNull(),
  description: text('description').notNull(),
  challenge: text('challenge').notNull(),
  solution: text('solution').notNull(),
  results: text('results').notNull(),
  featured: boolean('featured').default(false).notNull(),
  coverImage: text('cover_image'),
  technologies: jsonb('technologies').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insights = pgTable('insights', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(), // Markdown or HTML content
  author: text('author').notNull(),
  category: text('category').notNull(),
  coverImage: text('cover_image'),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projectRequests = pgTable('project_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  selectedServices: jsonb('selected_services').notNull(),
  timeline: text('timeline').notNull(),
  projectOverview: text('project_overview').notNull(),
  fullName: text('full_name').notNull(),
  workEmail: text('work_email').notNull(),
  companyName: text('company_name'),
  phone: text('phone'),
  requestNda: boolean('request_nda').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const consultationRequests = pgTable('consultation_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  consultationType: text('consultation_type').notNull(),
  preferredDate: text('preferred_date').notNull(),
  preferredTimeSlot: text('preferred_time_slot').notNull(),
  fullName: text('full_name').notNull(),
  workEmail: text('work_email').notNull(),
  companyName: text('company_name'),
  phone: text('phone'),
  discussionTopics: text('discussion_topics').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
export const userRoleEnum = pgEnum('user_role', [
  'SUPER_ADMIN', 'DEVELOPER', 'SOFTWARE_ENGINEER', 'SALES', 'RECEPTION'
]);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRoleEnum('role').default('SOFTWARE_ENGINEER').notNull(),
  jobTitle: text('job_title'),
  status: text('status').default('ACTIVE').notNull(),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id'),
  userName: text('user_name').notNull(),
  action: text('action').notNull(), // e.g. LOGIN, UPDATE_LEAD, CREATE_INSIGHT
  details: text('details').notNull(),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type').notNull(), // e.g. LEAD, PROJECT_REQUEST, CONSULTATION, SYSTEM
  read: boolean('read').default(false).notNull(),
  referenceId: uuid('reference_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});