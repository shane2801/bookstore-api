import { logger } from '../utils/logger.js';

export const requestLogger = (req, res, next) => {
    logger.info({
        message: `Incoming request: ${req.id}`,
        method: req.method,
        url: req.url
    });

    next();
};