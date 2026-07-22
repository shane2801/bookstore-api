import winston from 'winston';

const { combine, timestamp, printf, colorize, json } = winston.format;

// Console format 
// const consoleFormat = printf(({ level, message, timestamp }) => {
//     return `${timestamp} [${level}]: ${message}`;
// });

const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
    const metaString = Object.keys(meta).length
        ? JSON.stringify(meta, null, 2)
        : "";

    return `${timestamp} [${level}]: ${message} ${metaString}`;
});

export const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json() // file logs in JSON (better for production)
    ),
    transports: [
        // Console (dev)
        new winston.transports.Console({
            format: combine(colorize(), timestamp(), consoleFormat)
        }),

        // Error logs file
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),

        // All logs file
        new winston.transports.File({
            filename: 'logs/combined.log'
        })
    ]
});