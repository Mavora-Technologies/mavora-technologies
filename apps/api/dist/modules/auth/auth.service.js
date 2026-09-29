"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
//apps/api/src/modules/auth/auth.service.ts
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    static async authenticateUser(email, passwordPlain, ipAddress) {
        const [user] = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email.toLowerCase().trim()));
        if (!user) {
            await db_1.db.insert(schema_1.auditLogs).values({
                userName: email,
                action: 'FAILED_LOGIN',
                details: `Login attempt failed for unregistered email: ${email}`,
                ipAddress: ipAddress || 'unknown'
            });
            throw new Error('Invalid email or password.');
        }
        const passwordMatch = user.passwordHash === passwordPlain ||
            crypto_1.default.createHash('sha256').update(passwordPlain).digest('hex') === user.passwordHash;
        if (!passwordMatch) {
            await db_1.db.insert(schema_1.auditLogs).values({
                userId: user.id,
                userName: user.name,
                action: 'FAILED_LOGIN',
                details: `Failed login attempt with incorrect password for user ${user.email}`,
                ipAddress: ipAddress || 'unknown'
            });
            throw new Error('Invalid email or password.');
        }
        await db_1.db.update(schema_1.users)
            .set({ lastLogin: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, user.id));
        await db_1.db.insert(schema_1.auditLogs).values({
            userId: user.id,
            userName: user.name,
            action: 'LOGIN',
            details: `Admin user ${user.name} (${user.role}) logged in successfully.`,
            ipAddress: ipAddress || 'unknown'
        });
        const sessionPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            jobTitle: user.jobTitle,
            issuedAt: Date.now()
        };
        const token = Buffer.from(JSON.stringify(sessionPayload)).toString('base64');
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                jobTitle: user.jobTitle,
                status: user.status
            }
        };
    }
}
exports.AuthService = AuthService;
