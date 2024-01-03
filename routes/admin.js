const express = require('express');
const router = express.Router();

const bannerController = require('../controllers/admin/bannerController');
const categorycontroller = require('../controllers/admin/categoryController');
const customersController = require('../controllers/admin/customerController');
const dashboardController = require('../controllers/admin/dashboardController');
const ordersController = require("../controllers/admin/ordersController");
const productController = require('../controllers/admin/productController');
const loginController = require('../controllers/admin/loginController');


// category routes
router.get('/category',categorycontroller.get)
router.post('/category',categorycontroller.post)
router.get('/category/edit/:id',categorycontroller.getEdit)
router.post('/category/update',categorycontroller.postEdit)
router.post('/category/delete',categorycontroller.postDelete)
router.post('/category/search',categorycontroller.postSearch)
router.get('/category/searcResult',categorycontroller.searchRenderGet)
router.post('/category/filter',categorycontroller.postFilter)
router.post('/category/sort',categorycontroller.postSort)

//products routes
router.get('/products',productController.get)
router.post('/products',productController.post)
router.post('/products/delete',productController.postDelete)
router.get('/products/edit/:id',productController.getEdit)
router.post('/products/update',productController.postEdit)
router.post('/products/filter',productController.postFilter);
router.post('/products/sort',productController.postSort)
router.post('/products/search',productController.postSearch)

router.get('/customers',customersController.get)
router.get('/dashboard',dashboardController.get)
router.get('/orders',ordersController.get);

router.get('/banner',bannerController.get)
router.get('/login',loginController.get)
module.exports = router;