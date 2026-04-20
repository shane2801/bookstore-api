import express from 'express';
import * as userController  from '../controllers/userController.js';



const router = express.Router();


// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.delete('/:id', userController.deleteUser);
// router.patch('/:id', userController.updateUser);


router.post('/register', userController.createUser);
router.post('/login', userController.signin);

export default router;