import * as  productRepository from '../models/productRepository.js';

// GET ALL
export const getAllProducts = async ({ pagination }) => {

    if (!pagination) {
        const rows = await productRepository.fetchAllProducts({
        });

        return {
            data: rows,
            pagination: null, // explicitly indicate no pagination
        };
    }
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    const { rows, total } = await productRepository.fetchAllProducts({
        limit,
        offset
        // filters,
    });

    return {
        data: rows,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

    // GET ONE
    export const getProductById = async (id) => {
        const product = await productRepository.findProductById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    };

    // CREATE
    export const createProduct = async (data) => {
        return await productRepository.createProduct(data);
    };

    // UPDATE [PATCH]
    export const updateProduct = async (id, data) => {
        const existingProduct = await productRepository.findProductById(id);

        if (!existingProduct) {
            throw new Error('Product not found');
        }

        return await productRepository.updateProduct(id, data);
    };

    // DELETE
    export const deleteProduct = async (id) => {
        const existingProduct = await productRepository.findProductById(id);

        if (!existingProduct) {
            throw new Error('Product not found');
        }

        await productRepository.removeProduct(id);
    };


