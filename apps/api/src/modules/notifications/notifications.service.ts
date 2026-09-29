import { db } from '../../db';
import { notifications } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';

export class NotificationsService {
  static async getRecentNotifications() {
    return await db.select().from(notifications).orderBy(desc(notifications.createdAt)).limit(50);
  }

  static async markAsRead(id: string) {
    const [updated] = await db.update(notifications)
      .set({ read: true })
      .where(eq(notifications.id, id))
      .returning();
    return updated;
  }
}