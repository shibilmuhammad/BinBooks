const express = require('express');
const router = express.Router();

const aboutuscontroller = require('../controllers/user/aboutUsController');
const addressController = require('../controllers/user/addressController');
const logincontroller = require('../controllers/user/loginController');
const buynowController = require('../controllers/user/buynowController');
const categoryController = require('../controllers/user/categoryController');
const createAccountController = require('../controllers/user/createAccountController');
const homeController = require('../controllers/user/homeController');
const loginpswdController = require('../controllers/user/loginpswdController');
const myAccountController = require('../controllers/user/myAccountController');
const myCartController = require('../controllers/user/myCartController');
const ordersuccessfulController = require('../controllers/user/orderSuccessfulController');
const orderSummeryController = require('../controllers/user/orderSummeryController');
const otpController = require('../controllers/user/otpController');
const paymentController = require('../controllers/user/paymentController')
const placeOrderController = require('../controllers/user/placeOrderController');
const productController = require('../controllers/user/productController');
const productsController = require('../controllers/user/productsController');
const resetpswdController = require('../controllers/user/resetpswdController');
const searchResultController = require('../controllers/user/searchResultController');
const wishListController = require('../controllers/user/wishListController');
const yourOrderControllers = require('../controllers/user/yourOrdersController');

router.get('/login',logincontroller.get);
router.get('/aboutUs',aboutuscontroller.get);
router.get('/address',addressController.get);
router.get('/buynow',buynowController.get);
router.get('/category',categoryController.get);
router.get('/createAccount',createAccountController.get);
router.get('/home',homeController.get);
router.get('/loginPassword',loginpswdController.get);
router.get('/myAccount',myAccountController.get);
router.get('/myCart',myCartController.get);
router.get('/orderSuccessful',ordersuccessfulController.get);
router.get('/orderSummery',orderSummeryController.get)
router.get('/otp',otpController.get);
router.get('/payment',paymentController.get);
router.get('/placeOrder',placeOrderController.get);
router.get('/product',productController.get);
router.get('/products',productsController.get);
router.get('/resetPassword',resetpswdController.get);
router.get('/searchResult',searchResultController.get);
router.get('/wishList',wishListController.get);
router.get('/yourOrders',yourOrderControllers.get);
module.exports = router;