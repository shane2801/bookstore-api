// Request → extract token → verify → attach user → allow / block

import { verifyToken } from '../services/tokenService.js';

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 1. Check header exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // 2. Extract token
        const token = authHeader.split(' ')[1];

        // 3. Verify token
        const decoded = verifyToken(token);

        // 4. Attach user to request
        req.user = decoded;

        // 5. Continue
        next();

    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};