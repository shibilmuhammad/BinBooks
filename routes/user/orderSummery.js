const express = require('express');
const router = express.Router();
const orderSummeryController = require('../../controllers/user/orderSummeryController')
router.get('/orderSummery',orderSummeryController.showorderSummeryPage);
module.exports = router;