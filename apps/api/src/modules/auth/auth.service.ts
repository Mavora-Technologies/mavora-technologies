//apps/api/src/modules/auth/auth.service.ts
import { db } from '../../db';
import { users, auditLogs } from '../../db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export class AuthService {
  static async authenticateUser(email: string, passwordPlain: string, ipAddress?: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim()));

    if (!user) {
      await db.insert(auditLogs).values({
        userName: email,
        action: 'FAILED_LOGIN',
        details: `Login attempt failed for unregistered email: ${email}`,
        ipAddress: ipAddress || 'unknown'
      });
      throw new Error('Invalid email or password.');
    }

    const passwordMatch = user.passwordHash === passwordPlain || 
      crypto.createHash('sha256').update(passwordPlain).digest('hex') === user.passwordHash;

    if (!passwordMatch) {
      await db.insert(auditLogs).values({
        userId: user.id,
        userName: user.name,
        action: 'FAILED_LOGIN',
        details: `Failed login attempt with incorrect password for user ${user.email}`,
        ipAddress: ipAddress || 'unknown'
      });
      throw new Error('Invalid email or password.');
    }

    await db.update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, user.id));

    await db.insert(auditLogs).values({
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