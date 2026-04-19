import express from 'express';
import { upload } from '../middleware/multer.js';

import * as productController  from '../controllers/productController.js';



const router = express.Router();


router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/',upload.single('image_url'), productController.createProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id',upload.single('image_url'), productController.updateProduct)

export default router;