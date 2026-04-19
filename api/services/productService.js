import * as  productRepository  from '../models/productRepository.js';

// GET ALL
 export const getAllProducts = async () => {
    return await productRepository.fetchAllProducts();
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


