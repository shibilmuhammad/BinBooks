const customerModel = require('../../models/customers')
const productsModel = require('../../models/products');

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
            console.log('post prdocucts count '+productsWithCount[productIndex].product+ 'count is '+productsWithCount[productIndex].count);
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
        let user = await customerModel.findOne({phone:req.session.user})
      if(req.session.paymentSubmitted==='Cash on delivery'){
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
            status:'ordered'
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
        console.log('session is',req.session);
        res.locals.user = user.name;
        let  username = res.locals.user
        req.session.orderSuccessful = true;
        res.redirect('/user/orderSuccessful');
      }else if(req.session.paymentSubmitted===' Credit or debit Card'){
        console.log('credit');
      }else{
        console.log('otherupi');
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