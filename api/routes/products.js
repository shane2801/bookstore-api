import express from 'express';

import * as productController  from '../controllers/productController.js';



const router = express.Router();


router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id', productController.updateProduct)

export default router;