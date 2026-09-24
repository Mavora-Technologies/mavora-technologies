import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
dotenv.config();
const connectionString = process.env.DATABASE_URL;
const runMigration = async () => {
    if (!connectionString || connectionString.includes('ep-xxx')) {
        console.log('⚠️ [Notice]: DATABASE_URL is missing or using a placeholder.');
        console.log('💡 Skipping live migration for now so you can continue building. Update your root .env when ready.');
        return;
    }
    const pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 4000, // Fails fast instead of hanging
    });
    try {
        const db = drizzle(pool);
        console.log('🔄 Running database migrations against PostgreSQL...');
        await migrate(db, { migrationsFolder: './drizzle' });
        console.log('✅ Migrations completed successfully!');
    }
    catch (err) {
        console.warn('⚠️ [Migration Warning]: Could not reach the database server.');
        console.warn(`   Details: ${err.message}`);
        console.warn('💡 Your code is safe, but make sure your Neon database URL is correct when you are ready to connect.');
    }
    finally {
        await pool.end();
    }
};
runMigration();
