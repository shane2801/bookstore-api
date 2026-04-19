import * as  productService  from '../services/productService.js';
import { createProductSchema } from '../validators/productValidator.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productService.getProductById(id);

        // res.json(product);
        return successResponse(res, product, 'Product fetched successfully', HTTP_STATUS.OK)
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const validated = createProductSchema.parse(req.body);

        const product = await productService.createProduct(validated.name, validated.price);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await productService.deleteProduct(id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await productService.updateProduct(id, req.body);
        res.json(updatedProduct);
    } catch (err) {
        if (err.message === 'Product not found') {
            return res.status(404).json({ error: err.message });
        }
        res.status(400).json({ error: err.message });
    }
};
