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
 export const createProduct = async (name, price) => {
    if (!name || !price) {
        throw new Error('Missing fields');
    }

    if (price <= 0) {
        throw new Error('Price must be greater than 0');
    }

    return await productRepository.createProduct(name, price);
};

// DELETE
 export const deleteProduct = async (id) => {
    const product = await productRepository.findProductById(id);

    if (!product) {
        throw new Error('Product not found');
    }

    await productRepository.removeProduct(id);
};


// UPDATE (PATCH-style)
export const updateProduct = async (id, updates) => {
    const product = await productRepository.findProductById(id);

    if (!product) {
        throw new Error('Product not found');
    }


    const updatedProduct = await productRepository.updateProduct(
        id, updates
    );

    return updatedProduct;
};
