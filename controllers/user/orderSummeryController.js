const customerModel = require('../../models/customers')
const Product = require('../../models/products')
module.exports = {
    get:async function (req,res){

        console.log(req.params);
        let user = await customerModel.findOne({phone:req.session.user})
        let username;
        res.locals.user = user.name;
        username = res.locals.user
       
        if(req.params.orderId=='orderSuccessful'){{
            const order = user.orders[user.orders.length - 1];
            const populatedProducts = await Promise.all(order.products.map(async (product) => {
                const populatedProduct = await Product.findById(product.product).exec();
                return {
                    product: populatedProduct,
                    count: product.count,
                };
            }));
            order.products = populatedProducts;
            console.log(order);
            console.log('Populated products:', order.products);
            res.render('user/orderSummery',{user:username,order})
        
            }
        
        }else{
            const [orderId2,productId] = req.params.orderId.split('-');

            const specificProductId = productId
            console.log('orderId2'+orderId2);
            const order = user.orders.find(order => order._id.toString() === orderId2.toString());
            console.log('order is in the ',order);
            if (order && order.products) {
                const specificProductIndex = order.products.findIndex(product => product.product.toString() === specificProductId);
            
                if (specificProductIndex !== -1) {
                    const specificProduct = order.products[specificProductIndex];
            
                    const populatedProduct = await Product.findById(specificProduct.product).exec();
            
                    order.products = [{
                        product: populatedProduct,
                        count: specificProduct.count,
                    }];
            
                    console.log('Populated order with specific product:', order);
                    console.log('Populated specific product:', order.products[0]);
                    console.log('order status');
                    console.log(order);
                    console.log('order status2');
                    console.log(order.status);
                    res.render('user/orderSummery', { user: username, order });
                } else {
                    console.log('Specific product not found in the order');
                }
            } else {
                console.log('Order or products not found');
            }
 }}}