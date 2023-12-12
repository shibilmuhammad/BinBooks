const express = require('express');
const router = express.Router();
const placeOrderController = require('../../controllers/user/placeOrderController') ;
router.get('/placeOrder',placeOrderController.showplaceOrderPage);
module.exports = router;