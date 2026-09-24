import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://your_user:your_password@your_host/your_db?sslmode=require', // <-- Paste your actual DATABASE_URL here
  },
});