import * as userRepository from '../models/userRepository.js';

export const createUser = async (email, password) => {
    const existing = await userRepository.findUserByEmail(email);

    if (existing) {
        throw new Error('User already exists');
    }

    return await userRepository.createUser(email, password);
};

export const loginUser = async (email) => {
    return await userRepository.findUserByEmail(email);
};