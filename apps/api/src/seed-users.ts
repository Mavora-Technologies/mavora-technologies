// apps/api/src/seed-users.ts
import 'dotenv/config'; // Automatically loads apps/api/.env from current working directory
import { db } from './db/index.js';
import { users } from './db/schema.js';
import crypto from 'crypto';

const adminSeedData = [
  {
    name: 'Mohammed',
    email: 'mohammed@mavoratechnologies.com',
    role: 'SUPER_ADMIN' as const,
    jobTitle: 'Super Administrator',
    passwordHash: crypto.createHash('sha256').update('Mavora@Mohammed2026!').digest('hex'),
    status: 'ACTIVE'
  },
  {
    name: 'Jacobs',
    email: 'jacobs@mavoratechnologies.com',
    role: 'DEVELOPER' as const,
    jobTitle: 'Lead Developer',
    passwordHash: crypto.createHash('sha256').update('Mavora@Jacobs2026!').digest('hex'),
    status: 'ACTIVE'
  },
  {
    name: 'Valary',
    email: 'valary@mavoratechnologies.com',
    role: 'SOFTWARE_ENGINEER' as const,
    jobTitle: 'Software Engineer',
    passwordHash: crypto.createHash('sha256').update('Mavora@Valary2026!').digest('hex'),
    status: 'ACTIVE'
  },
  {
    name: 'Saum',
    email: 'saum@mavoratechnologies.com',
    role: 'SALES' as const,
    jobTitle: 'Sales Manager',
    passwordHash: crypto.createHash('sha256').update('Mavora@Saum2026!').digest('hex'),
    status: 'ACTIVE'
  },
  {
    name: 'Noreen',
    email: 'noreen@mavoratechnologies.com',
    role: 'RECEPTION' as const,
    jobTitle: 'Receptionist / Front Desk',
    passwordHash: crypto.createHash('sha256').update('Mavora@Noreen2026!').digest('hex'),
    status: 'ACTIVE'
  }
];

async function seedAdmins() {
  console.log('🌱 Upserting admin users into Neon PostgreSQL...');

  for (const admin of adminSeedData) {
    await db.insert(users)
      .values(admin)
      .onConflictDoUpdate({
        target: users.email,
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