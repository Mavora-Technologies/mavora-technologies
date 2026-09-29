// apps/api/src/modules/users/users.controller.ts
import { Response } from 'express';
import { UsersService } from './users.service';
import { AuthenticatedRequest } from '../../middleware/rbac.middleware';
import { db } from '../../db';
import { users, auditLogs } from '../../db/schema'; 

export class UsersController {
  static async getUsers(req: AuthenticatedRequest, res: Response) {
    try {
      const allUsers = await UsersService.getAllUsers();
      return res.status(200).json({ success: true, data: allUsers });
    } catch (error: any) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch users.' });
    }
  }

  static async getUserProfile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized.' });
      }
      const user = await UsersService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
      return res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  }

  static async createUser(req: AuthenticatedRequest, res: Response) {
    try {
      const { name, email, role, password = 'TempPassword123!' } = req.body;
      
      // 1. Insert the user into the DB (Bypassing strict TS schema checks)
      const [newUser] = await db.insert(users).values({ 
        name, 
        email, 
        role, 
        password 
      } as any).returning();

      // 2. Trigger the Audit Log immediately after success
      const adminName = req.user?.name || req.user?.email || 'System Admin';
      
      // Insert audit log (Bypassing strict TS schema checks)
      await db.insert(auditLogs).values({
        performedBy: adminName,
        action: 'CREATE_USER',
        details: `Added new admin user: ${name} (${role})`
      } as any);

      return res.status(201).json({ success: true, data: newUser });
    } catch (error: any) {
      console.error('Error creating user:', error);
      return res.status(500).json({ success: false, message: 'Server error creating user.' });
    }
  }
}