const express = require('express');
const router = express.Router();
const productController = require('../../controllers/user/productController')
router.get('/product',productController.showProductPage);
module.exports = router;