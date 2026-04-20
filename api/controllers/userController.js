import * as  userService from '../services/userService.js';
import { createUserSchema, signinSchema } from '../validators/userValidator.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';
import { hashPassword, verifyPassword } from '../services/hashService.js';
import { generateToken, verifyToken } from '../services/tokenService.js'




export const createUser = async (req, res) => {
    try {

        const { email, password } = createUserSchema.parse(req.body);

        // 🔐 hash password
        const hashedPassword = await hashPassword(password);

        const user = await userService.createUser(email, hashedPassword);

        res.status(201).json({
            message: 'User created',
            user
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = signinSchema.parse(req.body);

        const user = await userService.loginUser(email);

        if (!user) {
            throw new Error('No user found for that email address');
        }

        //  compare password
        const isValid = await verifyPassword(user.password, password);

        if (!isValid) {
            throw new Error('Invalid credentials');
        }

        // 🔐 generate token
        const token = generateToken({
            id: user.id,
            email: user.email
        });
        // remove password safely
        const { password: _, ...safeUser } = user;

        res.json({
            message: 'Login successful',
            token,
            user: safeUser
        });

    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

