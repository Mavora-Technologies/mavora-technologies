import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('⚠️ DATABASE_URL environment variable is missing!');
}

// Ensure postgres driver handles both default and namespace module exports
const postgresClient = (postgres.default || postgres) as unknown as typeof postgres.default;

const client = postgresClient(
  connectionString || 'postgresql://placeholder:placeholder@localhost:5432/placeholder',
  {
    max: 1,
    prepare: false,
  }
);

export const db = drizzle(client, { schema });