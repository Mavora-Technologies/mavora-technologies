"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogsService = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class AuditLogsService {
    static async getLogs() {
        return await db_1.db.select().from(schema_1.auditLogs).orderBy((0, drizzle_orm_1.desc)(schema_1.auditLogs.createdAt)).limit(100);
    }
}
exports.AuditLogsService = AuditLogsService;
