const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/user/paymentController') ;
router.get('/payment',paymentController.showpaymentPage);
module.exports = router;