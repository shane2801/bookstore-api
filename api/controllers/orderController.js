import * as orderService from '../services/orderService.js';
import { createOrderSchema } from '../validators/orderValidator.js';
import { updateOrderSchema } from '../validators/orderValidator.js';


export const createOrder = async (req, res) => {
    try {
        const validated = createOrderSchema.parse(req.body);

        const order = await orderService.createOrder(
            validated.product_id,
            validated.quantity
        );

        res.status(201).json({
            success: true,
            data: order
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();

        res.json({
            success: true,
            data: orders
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

export const getOrder = async (req, res) => {
    try {
        const order = await orderService.getOrder(req.params.id);

        res.json({
            success: true,
            data: order
        });

    } catch (err) {
        res.status(404).json({
            success: false,
            error: err.message
        });
    }
};


export const deleteOrder = async (req, res) => {
    try {
        await orderService.deleteOrder(req.params.id);

        res.json({
            success: true,
            message: 'Order deleted'
        });

    } catch (err) {
        res.status(404).json({
            success: false,
            error: err.message
        });
    }
};



export const updateOrder = async (req, res) => {
    try {
        const validated = updateOrderSchema.parse(req.body);

        const updated = await orderService.updateOrder(
            req.params.id,
            validated
        );

        res.json({
            success: true,
            data: updated
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};