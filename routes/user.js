const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleWare')

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
const logOutController = require('../controllers/user/logOutController')
// Login 
router.get('/logOut',logOutController.get)

router.get('/login',authMiddleware.isAuthenticated,logincontroller.get);
router.post('/login',authMiddleware.isAuthenticated,logincontroller.post)

router.get('/loginpassword',authMiddleware.isAuthenticated,authMiddleware.isPhonenumber,loginpswdController.get)
router.post('/loginpswd',authMiddleware.isAuthenticated,loginpswdController.post)

router.get('/aboutUs',aboutuscontroller.get);
router.get('/address',authMiddleware.requireLogin,authMiddleware.okeyForDeliver,addressController.get);
router.get('/user/address/:adressId',authMiddleware.okeyForDeliver,addressController.getaddress)
router.get('/address/edit/:addressId',addressController.getEdit)

//Buy now
router.get('/buynow',authMiddleware.requireLogin,buynowController.get);
router.post('/newAddress',authMiddleware.requireLogin,buynowController.post)
router.get('/buynow/:productId',authMiddleware.requireLogin,buynowController.getBuy)
router.post('/address/edit/:addressId',buynowController.postAddress)

router.get('/category',categoryController.get);
//Create account
router.post('/createAccount',createAccountController.post);

router.get('/home',homeController.get);
//myAccount
router.get('/myAccount',authMiddleware.requireLogin,myAccountController.get);
router.post('/myAccount/edit',myAccountController.post)

router.get('/orderSuccessful',ordersuccessfulController.get);
router.get('/orderSummery',orderSummeryController.get)
//Otp 
router.get('/forgetPassword',authMiddleware.isAuthenticated,authMiddleware.isPhonenumber,otpController.get);
router.post('/otp/confirmation',otpController.post)

router.get('/payment',authMiddleware.requireLogin,authMiddleware.okeyForDeliver,paymentController.get);
router.post('/payment',paymentController.post)


router.get('/placeOrder',authMiddleware.requireLogin,authMiddleware.okeyForDeliver,placeOrderController.get);
router.post('/placeOrder/updateQuantity/:productId',placeOrderController.postUpdate)
router.get('/proceedtoPay',placeOrderController.getProceedTopay)

router.get('/product/:productId',productController.get);
router.get('/products/:categoryName',productsController.get);
router.post('/products/filter',productsController.filterPost)
//My cart
router.get('/myCart/',authMiddleware.requireLogin,myCartController.get);
router.post('/myCart/:productId',myCartController.post);
router.post('/myCart/updateQuantity/:productId',myCartController.postUpdate)
router.get('/myCart/removeProduct/:productId',myCartController.removeget)
router.get('/mycart/placeOrder',myCartController.placeOrderget)

router.get('/resetPassword',authMiddleware.isAuthenticated,authMiddleware.isPhonenumber,resetpswdController.get);
router.post('/resetpassword',resetpswdController.post)
//Search 
router.get('/search',searchResultController.getSearch)
//WishList
router.get('/wishList',authMiddleware.requireLogin,wishListController.get);
router.post('/wishlist/:productId',authMiddleware.requireLoginMyCart,wishListController.post)
router.get('/wishlist/remove/:productId',wishListController.getremove)


router.get('/yourOrders',authMiddleware.requireLogin,yourOrderControllers.get);
module.exports = router;