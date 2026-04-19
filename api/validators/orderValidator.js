import { z } from 'zod';

export const createOrderSchema = z.object({
    product_id: z.number().int().positive(),
    quantity: z.number().int().positive()
});


export const updateOrderSchema = z.object({
    quantity: z.number().int().positive().optional()
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided'
});