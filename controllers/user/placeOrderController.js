const customerModel = require('../../models/customers')
const productsModel = require('../../models/products');
const Razorpay = require('razorpay');
require('dotenv').config()
var instance = new Razorpay({ key_id: 'rzp_test_QfPZ4R4jhKFmna', key_secret: process.env.razorpay_key_Secret })


let productsWithCount = [];
module.exports = {
    get:async function (req,res){
        let username;
        let user = await customerModel.findOne({phone:req.session.user})
        if (req.session.user) {
            res.locals.user = user.name;
             username = res.locals.user
             if(!req.session.addressSubmitted){
                res.redirect('/user/address')
            }else if (!req.session.paymentSubmitted){
                res.redirect('/user/payment')
            }else{
                let addressIdToFind = req.session.addressId
                let productsIds = req.session.productsIds
                let foundAddress = user.address.find(address => address._id.toString() === addressIdToFind);
              
                const allProductIdsMatch = productsIds.every(productEntry => {
                    return productsWithCount.some(productWithCount => productWithCount.product.toString() === productEntry.product.toString());
                });
    
                if (!allProductIdsMatch) {
                    productsWithCount = [];
                }
                if (!productsWithCount.length) {        
                    for (const productEntry of productsIds) {
                        const productId = productEntry.product;
                        const count = productEntry.count;
                        const foundProduct = await productsModel.findById(productId);
        
                        if (foundProduct) {
                            const productWithCount = {
                                product: foundProduct,
                                count: count,
                                
                            };
                            productsWithCount.push(productWithCount);
                        }
                    }
                }
                res.render('user/placeOrder',{user:username,address:foundAddress,products:productsWithCount,getDeliveryDate,categoryName:'Place Order',paymentMethod:req.session.paymentSubmitted})
            }
        }else{
            res.redirect('/user/login')
        }
        
    }, postUpdate:async function(req,res) {
      const userPhone = req.session.user;
      try {
          const productId = req.params.productId;
          const newQuantity = req.body.quantity;
          const productIndex = productsWithCount.findIndex(item => item.product._id.equals(productId));
          if (productIndex !== -1) {
            
            await updateProductCount(productIndex, newQuantity)
              res.json({
                success: true,
                message: 'Quantity updated successfully',
                productsWithCount: productsWithCount,
            });
          } else {
              res.status(404).json({ success: false, message: 'Product not found in the cart' });
          }
      } catch (error) {
          console.error('Error updating quantity:', error);
          res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    },
    getProceedTopay: async function(req,res){
        if(req.params.paymentId ==='paymentId'){

        }
        let user = await customerModel.findOne({phone:req.session.user})
        const orderProducts = productsWithCount.map(item => ({
            product: item.product._id, 
            count: item.count
        }));
        let addressIdToFind = req.session.addressId
        let foundAddress = user.address.find(address => address._id.toString() === addressIdToFind);
        const newOrder = {
            products: orderProducts,
            address: foundAddress,
            date: new Date(),
            paymentMethod:req.session.paymentSubmitted,
            status:'ordered',
            paymentId: req.params.paymentId !== 'paymentId' ? req.params.paymentId : undefined
        };
        user.orders.push(newOrder);
        delete req.session.addressId;
        delete req.session.addressSubmitted;
        delete req.session.paymentSubmitted
        if(req.session.productsIds.length>1){
            user.myCart=[]
        }
        delete req.session.productsIds
        await user.save();
        res.locals.user = user.name;
        let  username = res.locals.user
        req.session.orderSuccessful = true;
        res.redirect('/user/orderSuccessful');
  
    },getInvoice : async function(req,res){
        res.render('user/invoice')
    },orderConfirmation: async function(req,res){
        if(req.session.paymentSubmitted==='Cash on delivery' ){
            res.json('Cod')
        }
        else{   
            let totalAmount = 0;
            let totalMRP = 0;
            let totalDiscount = 0;
            let totalProductsCount = 0;
            let deliveryCharge
            deliveryCharge = 40;

            productsWithCount.forEach(function(data) {
                const totalPriceForProduct = data.product.salePrice * data.product.count;
                totalAmount += totalPriceForProduct;
                totalMRP += data.product.MRP * data.count;
                totalDiscount += (data.product.MRP - data.product.salePrice) * data.count;
                totalProductsCount += data.count;
            });
            const finalDiscountedPrice = totalMRP - totalDiscount;
            const totalPriceIncludingDelivery = finalDiscountedPrice + deliveryCharge;
            var options = {
                amount: totalPriceIncludingDelivery*100,  // amount in the smallest currency unit
                currency: "INR",
                receipt: "order_rcptid_11"
              };
            instance.orders.create(options, (err, order) => { 
                if (order) { 
                    res.status(200).send({ 
                        success: true, 
                        msg: "Order Created", 
                        order_id: order.id, 
                        amount: totalPriceIncludingDelivery*100, 
                        key_id: 'rzp_test_QfPZ4R4jhKFmna', 
                        name: 'rafeeq', 
                        email: 'muhammedrafeeqvr@gmail.com', 
                        contact: '957983967' 
               
                    }) 
                } 
                else if (err) { 
                    console.log("Error in creating razorpay order :", err) 
                    res.status(500).send() 
                }
            })
        }
    
    }
}

function getDeliveryDate(days) {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + days);

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = deliveryDate.toLocaleDateString('en-US', options);
    return formattedDate;
}
async function updateProductCount(index, newQuantity) {
    return new Promise(resolve => {
        setTimeout(() => {
            productsWithCount[index].count = newQuantity;
            resolve();
        }, 0);
    });
}