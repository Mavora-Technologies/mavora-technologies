"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// __filename and __dirname are automatically available globals in CommonJS
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../../.env') });
dotenv_1.default.config();
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.warn('⚠️ DATABASE_URL is not set in environment variables.');
}
exports.pool = new pg_1.Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
});
