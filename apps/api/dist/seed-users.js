"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// apps/api/src/seed-users.ts
require("dotenv/config"); // Automatically loads apps/api/.env from current working directory
const index_js_1 = require("./db/index.js");
const schema_js_1 = require("./db/schema.js");
const crypto_1 = __importDefault(require("crypto"));
const adminSeedData = [
    {
        name: 'Mohammed',
        email: 'mohammed@mavoratechnologies.com',
        role: 'SUPER_ADMIN',
        jobTitle: 'Super Administrator',
        passwordHash: crypto_1.default.createHash('sha256').update('Mavora@Mohammed2026!').digest('hex'),
        status: 'ACTIVE'
    },
    {
        name: 'Jacobs',
        email: 'jacobs@mavoratechnologies.com',
        role: 'DEVELOPER',
        jobTitle: 'Lead Developer',
        passwordHash: crypto_1.default.createHash('sha256').update('Mavora@Jacobs2026!').digest('hex'),
        status: 'ACTIVE'
    },
    {
        name: 'Valary',
        email: 'valary@mavoratechnologies.com',
        role: 'SOFTWARE_ENGINEER',
        jobTitle: 'Software Engineer',
        passwordHash: crypto_1.default.createHash('sha256').update('Mavora@Valary2026!').digest('hex'),
        status: 'ACTIVE'
    },
    {
        name: 'Saum',
        email: 'saum@mavoratechnologies.com',
        role: 'SALES',
        jobTitle: 'Sales Manager',
        passwordHash: crypto_1.default.createHash('sha256').update('Mavora@Saum2026!').digest('hex'),
        status: 'ACTIVE'
    },
    {
        name: 'Noreen',
        email: 'noreen@mavoratechnologies.com',
        role: 'RECEPTION',
        jobTitle: 'Receptionist / Front Desk',
        passwordHash: crypto_1.default.createHash('sha256').update('Mavora@Noreen2026!').digest('hex'),
        status: 'ACTIVE'
    }
];
async function seedAdmins() {
    console.log('🌱 Upserting admin users into Neon PostgreSQL...');
    for (const admin of adminSeedData) {
        await index_js_1.db.insert(schema_js_1.users)
            .values(admin)
            .onConflictDoUpdate({
            target: schema_js_1.users.email,
            set: {
                name: admin.name,
                role: admin.role,
                jobTitle: admin.jobTitle,
                passwordHash: admin.passwordHash,
                status: admin.status,
                updatedAt: new Date()
            }
        });
        console.log(`✅ Upserted admin user: ${admin.name} (${admin.role})`);
    }
    console.log('✨ Admin seeding completed successfully.');
    process.exit(0);
}
seedAdmins().catch((err) => {
    console.error('❌ Error seeding admin users:', err);
    process.exit(1);
});
