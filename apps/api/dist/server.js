"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const projects_1 = __importDefault(require("./routes/projects"));
const insights_1 = __importDefault(require("./routes/insights"));
const leads_1 = __importDefault(require("./routes/leads"));
const consultations_1 = __importDefault(require("./routes/consultations"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const users_routes_1 = __importDefault(require("./modules/users/users.routes"));
const notifications_routes_1 = __importDefault(require("./modules/notifications/notifications.routes"));
const audit_logs_routes_1 = __importDefault(require("./modules/audit-logs/audit-logs.routes"));
const db_1 = require("./db");
const schema_1 = require("./db/schema");
require("dotenv/config");
const app = (0, express_1.default)();
// Allowed Origins List
const allowedOrigins = [
    'http://localhost:3000',
    'https://mavoratechnologies.com',
    'https://www.mavoratechnologies.com',
    'https://mavora-technologies.pages.dev',
];
// Configure standard CORS middleware
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin) ||
            origin.endsWith('.mavora-technologies.pages.dev')) {
            return callback(null, true);
        }
        else {
            return callback(null, true); // Or callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}));
// Explicitly handle preflight OPTIONS requests globally
app.options('*', (0, cors_1.default)());
app.use(express_1.default.json());
// Health Check
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'OK', message: 'Mavora API is running' });
});
// API Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', users_routes_1.default);
app.use('/api/projects', projects_1.default);
app.use('/api/insights', insights_1.default);
app.use('/api/leads', leads_1.default);
app.use('/api/consultations', consultations_1.default);
app.use('/api/consultation', consultations_1.default);
app.use('/api/notifications', notifications_routes_1.default);
app.use('/api/audit-logs', audit_logs_routes_1.default);
// Project Request Endpoint
app.post('/api/projects/request', async (req, res) => {
    try {
        const { selectedServices, timeline, projectOverview, fullName, workEmail, companyName, phone, requestNda } = req.body;
        if (!fullName || !workEmail || !projectOverview || !selectedServices?.length) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        const [newRequest] = await db_1.db.insert(schema_1.projectRequests).values({
            selectedServices,
            timeline,
            projectOverview,
            fullName,
            workEmail,
            companyName,
            phone,
            requestNda,
        }).returning();
        return res.status(201).json({ success: true, data: newRequest });
    }
    catch (error) {
        console.error('Error saving project request:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
// 404 Handler
app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'API route not found' });
});
// Global Error Handler
app.use((err, _req, res, _next) => {
    console.error('Unhandled API Error:', err);
    res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Mavora API Server running at http://localhost:${PORT}`);
    });
}
exports.default = app;
