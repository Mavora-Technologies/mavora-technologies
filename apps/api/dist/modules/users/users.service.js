"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class UsersService {
    static async getAllUsers() {
        return await db_1.db.select({
            id: schema_1.users.id,
            name: schema_1.users.name,
            email: schema_1.users.email,
            role: schema_1.users.role,
            jobTitle: schema_1.users.jobTitle,
            status: schema_1.users.status,
            lastLogin: schema_1.users.lastLogin,
            createdAt: schema_1.users.createdAt
        }).from(schema_1.users);
    }
    static async getUserById(id) {
        const [user] = await db_1.db.select({
            id: schema_1.users.id,
            name: schema_1.users.name,
            email: schema_1.users.email,
            role: schema_1.users.role,
            jobTitle: schema_1.users.jobTitle,
            status: schema_1.users.status,
            lastLogin: schema_1.users.lastLogin,
            createdAt: schema_1.users.createdAt
        }).from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        return user || null;
    }
}
exports.UsersService = UsersService;
