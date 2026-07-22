import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    logger.error({
        id: req.id,
        message: err.message,
        method: req.method,
        url: req.url,
        stack: err.stack
    });

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};