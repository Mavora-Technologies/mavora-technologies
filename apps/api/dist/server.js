import express from 'express';
import cors from 'cors';
import projectsRouter from './routes/projects.js';
import insightsRouter from './routes/insights.js';
import leadsRouter from './routes/leads.js';
import consultationRouter from './routes/consultations.js';
const app = express();
const allowedOrigins = [
    'http://localhost:3000',
    'https://mavoratechnologies.com',
    'https://www.mavoratechnologies.com',
    'https://mavora-technologies.pages.dev',
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin) ||
            origin.endsWith('.mavora-technologies.pages.dev')) {
            return callback(null, origin);
        }
        return callback(null, 'https://mavoratechnologies.com');
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}));
app.use(express.json());
// Health Check
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'OK', message: 'Mavora API is running' });
});
// Mounted Routers
app.use('/api/projects', projectsRouter);
app.use('/api/insights', insightsRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/consultation', consultationRouter);
// 404 Route
app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'API route not found' });
});
// Centralized Error Handler
app.use((err, _req, res, _next) => {
    console.error('Unhandled API Error:', err);
    const isProduction = process.env.NODE_ENV === 'production';
    res.status(500).json({
        success: false,
        message: isProduction ? 'Internal server error' : err.message || 'Internal server error',
    });
});
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Mavora API Server running at http://localhost:${PORT}`);
    });
}
export default app;
