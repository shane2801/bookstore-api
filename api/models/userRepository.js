// models/userRepository.js
import db from '../../config/db.js';

export const createUser = async (email, password) => {
    const result = await db.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
        [email, password]
    );
    return result.rows[0];
};

export const findUserByEmail = async (email) => {
    const result = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0];
};