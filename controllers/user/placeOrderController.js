const customerModel = require('../../models/customers')
const productsModel = require('../../models/products');
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
                console.log(req.session);
                let addressIdToFind = req.session.addressId
                let productsIds = req.session.productsIds
                let foundAddress = user.address.find(address => address._id.toString() === addressIdToFind);
                let productsWithCount = [];
                console.log('prodcut ids '+productsIds[0]);
                for (const productEntry of productsIds) {
                    const productId = productEntry.product;
                    const count = productEntry.count;
                    const foundProduct = await productsModel.findById(productId);
                    if (foundProduct) {
                        const productWithCount = {
                            product: foundProduct,
                            count: count
                        };
                        productsWithCount.push(productWithCount);
                    }
                }
                productsWithCount.forEach(function(data){
                    console.log('data is '+data.product.bookName);
                    console.log('count is '+data.count);
                })
                console.log(' found addres is '+foundAddress);
                const currentDate = new Date();

// Function to get the delivery date after a given number of days
function getDeliveryDate(days) {
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + days);

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = deliveryDate.toLocaleDateString('en-US', options);
    
    return formattedDate;
}
                res.render('user/placeOrder',{user:username,address:foundAddress,products:productsWithCount,getDeliveryDate})
            }
        }else{
            res.redirect('/user/login')
        }
        
    }
}