import { z } from 'zod';

// CREATE product
export const createProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().positive('Price must be greater than 0')
});

// PATCH product (partial update)
export const updateProductSchema = z.object({
    name: z.string().min(1).optional(),
    price: z.number().positive().optional()
});

