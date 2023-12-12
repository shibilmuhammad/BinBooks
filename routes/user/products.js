const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/user/productsController')
router.get('/products',productsController.showProductsPage);
module.exports = router;