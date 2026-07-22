import * as  productService from '../services/productService.js';
import { createProductSchema, updateProductSchema } from '../validators/productValidator.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';
import { uploadToCloudinary } from '../services/mediaService.js';
import { logger } from '../utils/logger.js';


export const getAllProducts = async (req, res) => {
    try {
        // /products	page = 1, limit = default (e.g. 10)
        // /products?page=2	page = 2, limit = default
        // /products?limit=10	page = 1, limit = 10
        // /products?page=2&limit=10	page = 2, limit = 10
        // GET /products?all=true

        const { page, limit, all } = req.query;

        const isAll = all === "true";
        const rawPage = parseInt(page, 10);
        const rawLimit = parseInt(limit, 10);


        const pagination = isAll ? null : {
            page: rawPage > 0 ? rawPage : 1, //default 1
            limit: rawLimit > 0 ? Math.min(rawLimit, 100) : 10,
        };

        logger.info(`[REQ ${req.id}] Controller: getAllProducts with parameters page: ${rawPage} and limit ${rawLimit}`)

        const products = await productService.getAllProducts({pagination});

        logger.info(`[REQ ${req.id}] Controller: getAllProducts returned data: `, { products });

        return successResponse(
            res, {
            data: products,
            message: 'Products fetched sucessfully',
            statusCode: HTTP_STATUS.OK
        }
        );
    } catch (err) {
        return errorResponse(
            res, {
            message: 'Failed to fetch products :(',
            statusCode: HTTP_STATUS.SERVER_ERROR,
            code: 'PRODUCTS_FETCH_ERROR',
            error: err
        }
        );
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        logger.info(`Fetching product with id: ${id}`);

        const product = await productService.getProductById(id);

        return successResponse(
            res, {
            data: product,
            message: 'Product fetched successfully',
            statusCode: HTTP_STATUS.OK
        }
        );
    } catch (err) {
        // return errorResponse(
        //     res, {
        //     message: 'Failed to fetch product :(',
        //     statusCode: HTTP_STATUS.SERVER_ERROR,
        //     code: 'PRODUCT_FETCH_ERROR',
        //     error: err
        // }
        // );
        logger.error(`Error fetching product ${req.params.id}`, {
            error: err.message
        });
        next(err);

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

        // copy everything from req.body into new object
        // override price, inventoryCount and image_url
        const data = {
            ...req.body,
            price: Number(req.body.price),
            inventory_count: Number(req.body.inventory_count),
            image_url
        };


        const validated = createProductSchema.parse(data);

        const product = await productService.createProduct(validated);

        return successResponse(
            res, {
            data: product,
            message: 'Product created successfully',
            statusCode: HTTP_STATUS.CREATED
        }
        );
    } catch (err) {
        return errorResponse(
            res, {
            message: 'Failed to create a product :(',
            statusCode: HTTP_STATUS.BAD_REQUEST,
            code: 'PRODUCT_CREATION_ERROR',
            error: err
        }
        );
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

        // console.log(data)

        const validated = updateProductSchema.parse(data);

        const updatedProduct = await productService.updateProduct(id, validated);

        return successResponse(
            res, {
            data: updatedProduct,
            message: 'Product updated successfully',
            statusCode: HTTP_STATUS.CREATED
        }
        );
    } catch (err) {
        return errorResponse(
            res, {
            message: 'Failed to patch product :(',
            statusCode: HTTP_STATUS.BAD_REQUEST,
            code: 'PRODUCT_PATCH_ERROR',
            error: err
        });
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        await productService.deleteProduct(id);

        return successResponse(
            res, {
            message: 'Product deleted successfully',
            statusCode: HTTP_STATUS.OK
        }
        );
    } catch (err) {
        // return errorResponse(
        //     res, {
        //     message: 'Failed to delete a product :(',
        //     statusCode: HTTP_STATUS.NOT_FOUND,
        //     code: 'PRODUCT_DELETION_ERROR',
        //     error: err
        // });
        logger.error(`Error deleting product ${req.params.id}`, {
            error: err.message
        });
        next(err)
    }
};


