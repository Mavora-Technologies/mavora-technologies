import { db } from '../../db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

export class UsersService {
  static async getAllUsers() {
    return await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      jobTitle: users.jobTitle,
      status: users.status,
      lastLogin: users.lastLogin,
      createdAt: users.createdAt
    }).from(users);
  }

  static async getUserById(id: string) {
    const [user] = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      jobTitle: users.jobTitle,
      status: users.status,
      lastLogin: users.lastLogin,
      createdAt: users.createdAt
    }).from(users).where(eq(users.id, id));
    
    return user || null;
  }
}