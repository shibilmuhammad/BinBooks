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
// Admin Routes
const adminProducts = require('./routes/admin/products');
const adminCustomers = require('./routes/admin/customers');
const adminOrders = require('./routes/admin/orders')
const adminCategory = require('./routes/admin/category')
const adminBannerManage = require('./routes/admin/bannermanage')
// User Routes
const userRoutes = require('./routes/user/home')

//Admin Routes use 
app.use('/admin',adminProducts,adminCustomers,adminOrders,adminCategory,adminBannerManage);
//Users Routes use 
app.use('/user',userRoutes)
