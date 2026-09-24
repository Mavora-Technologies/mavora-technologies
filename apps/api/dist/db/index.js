import 'dotenv/config'; // <-- ADD THIS LINE AT THE VERY TOP
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error('⚠️ DATABASE_URL environment variable is missing!');
}
const client = postgres(connectionString || 'postgresql://localhost:5432/placeholder', {
    max: 1,
    prepare: false,
    ssl: connectionString ? 'require' : false,
});
export const db = drizzle(client, { schema });
