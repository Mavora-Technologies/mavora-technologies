"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_postgres_1 = require("drizzle-orm/node-postgres");
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// __filename and __dirname are automatically available in CommonJS
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../../.env') });
dotenv_1.default.config();
const connectionString = process.env.DATABASE_URL;
const runMigration = async () => {
    if (!connectionString || connectionString.includes('ep-xxx')) {
        console.log('⚠️ [Notice]: DATABASE_URL is missing or using a placeholder.');
        console.log('💡 Skipping live migration for now so you can continue building. Update your root .env when ready.');
        return;
    }
    const pool = new pg_1.Pool({
        connectionString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 4000,
    });
    try {
        const db = (0, node_postgres_1.drizzle)(pool);
        console.log('🔄 Running database migrations against PostgreSQL...');
        await (0, migrator_1.migrate)(db, { migrationsFolder: './drizzle' });
        console.log('✅ Migrations completed successfully!');
    }
    catch (err) {
        console.warn('⚠️ [Migration Warning]: Could not reach the database server.');
        console.warn(`   Details: ${err.message}`);
    }
    finally {
        await pool.end();
    }
};
runMigration();
