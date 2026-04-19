import './config/env.js';
import app from './app.js';
import http from 'http';
import db from './config/db.js';

export async function start() {
    try {
        const port = process.env.PORT || 3000;

        console.log('🚀 Starting application...');

        // 1. TEST DATABASE CONNECTION (VERY IMPORTANT)
        await db.query('SELECT 1');
        console.log('✅ Database connected');

        // 2. CREATE SERVER
        const server = http.createServer(app);

        // 3. START SERVER
        server.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });

        // 4. GRACEFUL SHUTDOWN
        process.on('SIGTERM', () => {
            console.log('🛑 SIGTERM received. Shutting down...');
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
            console.log('🛑 SIGINT received. Shutting down...');
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        });

        return server;

    } catch (err) {
        console.error('❌ Startup failed:', err);

        // fail fast (VERY important in production)
        process.exit(1);
    }
}