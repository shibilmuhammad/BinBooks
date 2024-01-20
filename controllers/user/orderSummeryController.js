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
            res.render('user/orderSummery',{user:username,order,categoryName:'Order Summery'})
        
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
                    res.render('user/orderSummery', { user: username, order ,categoryName:'Order Summery'});
                } else {
                    console.log('Specific product not found in the order');
                }
            } else {
                console.log('Order or products not found');
            }
 }},getInvoice: async function(req,res){
    let orderId = req.params.orderId;
try {
    let order = await customerModel.findOne(
        { 
            phone: req.session.user, 
            'orders._id': orderId 
        },
        { 'orders.$': 1 } 
    );

        let populatedOrders = await Promise.all(order.orders.map(async (order) => {
            if (order.products && Array.isArray(order.products)) {
                const populatedProducts = await Promise.all(order.products.map(async (product) => {
                    const populatedProduct = await Product.findById(product.product).exec();
                    return {
                        ...product.toObject(),
                        product: populatedProduct
                    };
                }));

                order.products = populatedProducts;
                return order;
            } else {
                console.log('Order has no products or is not an array');
                return order;
            }
        }));
        // populatedOrders.forEach(function(order) {
        //     console.log('popuuuuuuuuu', order._id, order.status);
        //     order.products.forEach(function (product) {
        //             console.log('book '+product.product.bookName,product.count);
        //     });
        // });

        res.render('user/invoice',{order:populatedOrders})
        // order.products = populatedProducts;
        // return order;
  
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
 }
}