import pkg from 'pg';
const { Pool } = pkg;

// console.log('DB USER:', process.env.DB_USER);
// console.log('Hello from db.js', process.env.DB_USER);

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export default db;