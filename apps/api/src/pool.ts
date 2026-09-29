import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// __filename and __dirname are automatically available globals in CommonJS
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('⚠️ DATABASE_URL is not set in environment variables.');
}

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});