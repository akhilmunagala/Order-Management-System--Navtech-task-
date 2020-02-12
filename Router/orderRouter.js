const express = require('express');
const router = express.Router();

const orderController = require('../Controller/orderController');

router.post('/create', orderController.createOrder);
router.get('/list', orderController.getAllOrders);
router.get('/:id', orderController.getOrder);
router.get('/delete/:id', orderController.deleteOrder);
router.post('/update/:id', orderController.updateOrder);

module.exports = router;