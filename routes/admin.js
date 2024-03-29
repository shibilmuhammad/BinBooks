const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/adminAuthMiddleWare')
const bannerController = require('../controllers/admin/bannerController');
const categorycontroller = require('../controllers/admin/categoryController');
const customersController = require('../controllers/admin/customerController');
const dashboardController = require('../controllers/admin/dashboardController');
const ordersController = require("../controllers/admin/ordersController");
const productController = require('../controllers/admin/productController');
const loginController = require('../controllers/admin/loginController');


// category routes
router.get('/category',authMiddleware.requireLogin,categorycontroller.get)
router.post('/category',categorycontroller.post)
router.get('/category/edit/:id',categorycontroller.getEdit)
router.post('/category/update',categorycontroller.postEdit)
router.post('/category/delete',categorycontroller.postDelete)
router.post('/category/search',categorycontroller.postSearch)
router.get('/category/searcResult',categorycontroller.searchRenderGet)
router.post('/category/filter',categorycontroller.postFilter)
router.post('/category/sort',categorycontroller.postSort)

//products routes
router.get('/products',authMiddleware.requireLogin,productController.get)
router.post('/products',productController.post)
router.post('/products/delete',productController.postDelete)
router.get('/products/edit/:id',productController.getEdit)
router.post('/products/update',productController.postEdit)
router.post('/products/filter',productController.postFilter);
router.post('/products/sort',productController.postSort)
router.post('/products/search',productController.postSearch)

//banner
router.get('/banner',authMiddleware.requireLogin,bannerController.get)
router.post('/banner',bannerController.post)
router.get('/banner/:bannerId',bannerController.getEdit)

//customers
router.get('/customers',authMiddleware.requireLogin,customersController.get)
router.get('/customer/edit/:customerId',customersController.getEdit);
router.post('/customer/edit',customersController.postEdit)
router.post('/customers/search',customersController.postSearch)
router.post('/customers/sort',customersController.postSort)
router.post('/customers/filter',customersController.postFilter)

router.get('/dashboard',authMiddleware.requireLogin,dashboardController.get)

//Orders
router.get('/orders',authMiddleware.requireLogin,ordersController.get);
router.get('/orders/edit/:ids',ordersController.getEdit)
router.post('/orders/update/:ids',ordersController.postEdit)
router.post('/orders/search',ordersController.postSearch)
router.post('/orders/sort',ordersController.postSort)
router.post('/orders/filter',ordersController.postFilter)
router.get('/gender-counts',ordersController.genderCount)

router.get('/logOut',loginController.getLogOut)
router.get('/login',authMiddleware.isAuthenticated,loginController.get)
router.post('/login',loginController.post)
module.exports = router;