import * as orderRepository from '../models/orderRepository.js';
import * as productRepository from '../models/productRepository.js';

export const createOrder = async (product_id, quantity) => {
    // business rule: product must exist
    const product = await productRepository.findProductById(product_id);

    if (!product) {
        throw new Error('Product not found');
    }

    return await orderRepository.createOrder(product_id, quantity);
};

export const getOrders = async () => {
    return await orderRepository.getAllOrders();
};

export const getOrder = async (id) => {
    const order = await orderRepository.getOrderById(id);

    if (!order) {
        throw new Error('Order not found');
    }

    return order;
};

export const deleteOrder = async (id) => {
    const deleted = await orderRepository.deleteOrder(id);

    if (!deleted) {
        throw new Error('Order not found');
    }

    return deleted;
};

export const updateOrder = async (id, updates) => {
    const updated = await orderRepository.updateOrder(id, updates);

    if (!updated) {
        throw new Error('Order not found');
    }

    return updated;
};