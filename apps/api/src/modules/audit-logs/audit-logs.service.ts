import { db } from '../../db';
import { auditLogs } from '../../db/schema';
import { desc } from 'drizzle-orm';

export class AuditLogsService {
  static async getLogs() {
    return await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(100);
  }
}