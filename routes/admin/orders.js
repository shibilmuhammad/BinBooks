const express = require('express');
const router = express.Router();
const ordersController = require('../../controllers/admin/ordersController');

router.get('/orders',ordersController.showOrdersPage);
module.exports = router;