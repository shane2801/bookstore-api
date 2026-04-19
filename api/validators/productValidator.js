import { z } from 'zod';

// CREATE product
export const createProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().positive('Price must be greater than 0'),
    image_url: z.string().optional(),
    inventory_count:z.number().int().min(0, 'inventory_count is required')
});

// PATCH product (partial update)
export const updateProductSchema = z.object({
    name: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    image_url: z.string().optional(),
    inventory_count:z.number().positive().optional()
});

