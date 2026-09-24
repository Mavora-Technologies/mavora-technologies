import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema'; // Adjust path to your schema if needed

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('❌ DATABASE_URL environment variable is missing. Check that your .env file is in the correct app directory.');
}

// Neon requires ssl: 'require'
const client = postgres(connectionString, { 
  ssl: 'require',
  prepare: false // Recommended for serverless/pooled connections like Neon
});

export const db = drizzle(client, { schema });