import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    console.log('Attempting to connect to the database...');
    const client = await pool.connect();
    
    const res = await client.query('SELECT NOW();');
    console.log('✅ Connection successful!');
    console.log('🕒 Current database timestamp:', res.rows[0].now);
    
    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  } finally {
    await pool.end();
  }
}

testConnection();