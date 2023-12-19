const express = require('express');
const app = express();
const path = require('path')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const liveReloadServer = livereload.createServer(  );
liveReloadServer.watch(path.join(__dirname, "views"));
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 10);
});
app.use(connectLivereload());
app.listen(3000,()=>{
    console.log("listening to port 3000")
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/user');
app.use('/user',userRoutes);
// Admin Routes
const adminProducts = require('./routes/admin/products');
const adminCustomers = require('./routes/admin/customers');
const adminOrders = require('./routes/admin/orders')
const adminCategory = require('./routes/admin/category')
const adminBannerManage = require('./routes/admin/bannermanage');
const adminDashboard = require('./routes/admin/dashboard')
// User Routes
const Home = require('./routes/user/home');
const category = require('./routes/user/category');
const products = require('./routes/user/products');
const product = require('./routes/user/product');
const buynow = require('./routes/user/buynow');
const payment= require('./routes/user/payment');
const placeOrder= require('./routes/user/placeOrder');
const orderSuccessful = require('./routes/user/orderSuccessful');
const address = require('./routes/user/address');
const yourOrders = require("./routes/user/yourorders");
const orderSummery = require("./routes/user/orderSummery");
const wishList = require('./routes/user/wishList');
const myAccount = require('./routes/user/myAccount');
const searchResult = require('./routes/user/searchResult');
const myCart = require('./routes/user/myCart');
const login = require('./routes/user/login');
const loginpswd = require('./routes/user/loginpswd');
const Otp = require('./routes/user/otp');
const resetpswd = require('./routes/user/resetpswd');
const createAccount = require('./routes/user/createAccount');
const aboutUs = require('./routes/user/aboutUs')


//Admin Routes use 
app.use('/admin',adminProducts,adminCustomers,adminOrders,adminCategory,adminBannerManage,adminDashboard);
//Users Routes use 
app.use('/user',Home,category,products,product,buynow,payment,placeOrder,orderSuccessful,address,yourOrders,orderSummery,wishList,myAccount,searchResult,myCart,login,loginpswd,Otp,resetpswd,createAccount,aboutUs)
