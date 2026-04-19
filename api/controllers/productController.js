import * as  productService from '../services/productService.js';
import { createProductSchema, updateProductSchema } from '../validators/productValidator.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';
import { uploadToCloudinary } from '../services/mediaService.js';


export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();

        return successResponse(
            res,
            products,
            'Products fetched successfully',
            HTTP_STATUS.OK
        );
    } catch (err) {
        return errorResponse(res, err.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productService.getProductById(id);

        return successResponse(
            res,
            product,
            'Product fetched successfully',
            HTTP_STATUS.OK
        );
    } catch (err) {
        return errorResponse(res, err.message, HTTP_STATUS.NOT_FOUND);
    }
};

export const createProduct = async (req, res) => {
        try {
        let image_url = null;

        // console.log('FILE:', req.file);
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            image_url = result.secure_url;
        }

        const data = {
            ...req.body,
            price: Number(req.body.price),
            inventory_count: Number(req.body.inventory_count),
            image_url
        };


        const validated = createProductSchema.parse(data);

        const product = await productService.createProduct(validated);

        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const updateProduct = async (req, res) => {
     try {
        const { id } = req.params;

        let image_url;

        // if new image uploaded → replace
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            image_url = result.secure_url;
        }

        const data = {
            ...req.body,
            ...(req.body.price && { price: Number(req.body.price) }),
            ...(req.body.inventory_count && {
                inventory_count: Number(req.body.inventory_count)
            }),
            ...(image_url && { image_url })
        };

        console.log(data)

        const validated = updateProductSchema.parse(data);

        const updatedProduct = await productService.updateProduct(id, validated);

        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await productService.deleteProduct(id);

        return successResponse(
            res,
            null,
            'Product deleted successfully',
            HTTP_STATUS.OK
        );
    } catch (err) {
        return errorResponse(res, err.message, HTTP_STATUS.NOT_FOUND);
    }
};


