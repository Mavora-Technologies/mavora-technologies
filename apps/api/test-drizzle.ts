import { db } from './src/db/index.js';
import { leads } from './src/db/schema.js';

async function testDrizzle() {
  try {
    console.log('Inserting a test lead...');
    const newLead = await db.insert(leads).values({
      fullName: 'Test User',
      email: `test_${Date.now()}@mavora.com`,
      service: 'Web Development',
      message: 'Testing Drizzle integration with Neon.',
    }).returning();
    
    console.log('✅ Lead inserted successfully:', newLead);

    console.log('Fetching all leads...');
    const allLeads = await db.select().from(leads);
    console.log('📋 Current leads in database:', allLeads);
  } catch (err) {
    console.error('❌ Drizzle test failed:', err);
  }
}

testDrizzle();