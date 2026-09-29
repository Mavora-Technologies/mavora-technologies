"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class NotificationsService {
    static async getRecentNotifications() {
        return await db_1.db.select().from(schema_1.notifications).orderBy((0, drizzle_orm_1.desc)(schema_1.notifications.createdAt)).limit(50);
    }
    static async markAsRead(id) {
        const [updated] = await db_1.db.update(schema_1.notifications)
            .set({ read: true })
            .where((0, drizzle_orm_1.eq)(schema_1.notifications.id, id))
            .returning();
        return updated;
    }
}
exports.NotificationsService = NotificationsService;
