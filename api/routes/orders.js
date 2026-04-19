import express from 'express';
import * as orderController from'../controllers/orderController.js';
const router = express.Router();

// '/orders' endpoints are routed to this file
// router.get('/', (req, res, next) => {

//     res.status(200).json({ message: 'Handling GET requests to /orders' })
// });


// router.get('/:orderId', (req, res, next) => {

//     const id = req.params.proudctId;
//     res.status(200).json({ message: 'Order details', id: id });


// });



// router.patch('/:orderId', (req, res, next) => {
//     res.status(200).json({ message: 'You updated a order!' });

// });


// router.delete('/:orderId', (req, res, next) => {
//     res.status(200).json({ message: 'You deleted a order!' });

// });

// router.post('/', (req, res, next) => {
//     const order = {
//         productId: req.body.productId,
//         quantity: req.body.quantity
//     }
//     res.status(201).json({ message: 'Handling POST requests to /orders', order:order })
// });



router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrder);
router.post('/', orderController.createOrder);
router.patch('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export default router;