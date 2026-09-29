// apps/api/src/modules/leads/leads.service.ts
import { db } from '../../db'; // Adjust the import path to your Drizzle database instance
import { leads } from '../../db/schema'; // Adjust the import path to your Drizzle schema definition
import { eq, desc } from 'drizzle-orm';

export class LeadsService {
  async getAllLeads() {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLeadById(id: string) {
    const result = await db.select().from(leads).where(eq(leads.id, id));
    return result[0] || null;
  }

  async createLead(data: {
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    message?: string;
    source?: string;
  }) {
    const insertValues: typeof leads.$inferInsert = {
      ...data,
      status: 'NEW',
    } as any;

    const result = await db
      .insert(leads)
      .values(insertValues)
      .returning();
      
    return result[0];
  }

  async updateLeadStatus(id: string, status: string) {
    const result = await db
      .update(leads)
      .set({ 
        status: status as any, 
        updatedAt: new Date() 
      })
      .where(eq(leads.id, id))
      .returning();
      
    return result[0];
  }

  async deleteLead(id: string) {
    const result = await db
      .delete(leads)
      .where(eq(leads.id, id))
      .returning();
      
    return result[0];
  }
}