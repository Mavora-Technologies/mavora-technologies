"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
// apps/api/src/modules/leads/leads.service.ts
const db_1 = require("../../db"); // Adjust the import path to your Drizzle database instance
const schema_1 = require("../../db/schema"); // Adjust the import path to your Drizzle schema definition
const drizzle_orm_1 = require("drizzle-orm");
class LeadsService {
    async getAllLeads() {
        return await db_1.db.select().from(schema_1.leads).orderBy((0, drizzle_orm_1.desc)(schema_1.leads.createdAt));
    }
    async getLeadById(id) {
        const result = await db_1.db.select().from(schema_1.leads).where((0, drizzle_orm_1.eq)(schema_1.leads.id, id));
        return result[0] || null;
    }
    async createLead(data) {
        const insertValues = {
            ...data,
            status: 'NEW',
        };
        const result = await db_1.db
            .insert(schema_1.leads)
            .values(insertValues)
            .returning();
        return result[0];
    }
    async updateLeadStatus(id, status) {
        const result = await db_1.db
            .update(schema_1.leads)
            .set({
            status: status,
            updatedAt: new Date()
        })
            .where((0, drizzle_orm_1.eq)(schema_1.leads.id, id))
            .returning();
        return result[0];
    }
    async deleteLead(id) {
        const result = await db_1.db
            .delete(schema_1.leads)
            .where((0, drizzle_orm_1.eq)(schema_1.leads.id, id))
            .returning();
        return result[0];
    }
}
exports.LeadsService = LeadsService;
