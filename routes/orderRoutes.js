import express from 'express';
import { createOrder, getAllOrders,getOrderById } from '../controllers/orderControllers.js'; // Adjust the path

const router = express.Router();

router.post('/', createOrder);
router.get('/getAllOrders', getAllOrders);
router.get('/:orderId', getOrderById);


export default router;