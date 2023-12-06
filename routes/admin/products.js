const express = require('express');
const router = express.Router();
const productController =  require('../../controllers/admin/productController')

router.get('/products',productController.showProductsPage);
module.exports= router;