const express = require('express');
const router = express.Router();

const bannerController = require('../controllers/admin/bannerController');
const categorycontroller = require('../controllers/admin/categoryController');
const customersController = require('../controllers/admin/customerController');
const dashboardController = require('../controllers/admin/dashboardController');
const ordersController = require("../controllers/admin/ordersController");
const productController = require('../controllers/admin/productController');

router.get('/banner',bannerController.get)
router.get('/category',categorycontroller.get)
router.post('/category',categorycontroller.post)
router.get('/category/edit/:id',categorycontroller.getEdit)
router.post('/category/update/',categorycontroller.postEdit)
router.get('/customers',customersController.get)
router.get('/dashboard',dashboardController.get)
router.get('/orders',ordersController.get);
router.get('/products',productController.get)

module.exports = router;