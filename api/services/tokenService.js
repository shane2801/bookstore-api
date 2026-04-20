import jwt from 'jsonwebtoken';
import fs from 'fs';

const privateKey = fs.readFileSync('../../keys/private.key');
const publicKey = fs.readFileSync('../../keys/public.key');

export const generateToken = (payload) => {
    return jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1h'
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, publicKey, {
        algorithms: ['RS256']
    });
};