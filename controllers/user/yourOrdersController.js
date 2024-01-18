const customerModel = require('../../models/customers');
const products = require('../../models/products');
const Product = require('../../models/products');

module.exports = {
    get: async function (req, res) {
        try {
            if (req.session.user) {
                const customer = await customerModel.findOne({ phone: req.session.user });
                res.locals.user = customer.name;
                if (customer && customer.orders && Array.isArray(customer.orders)) {
                    const orders = customer.orders;

                    let populatedOrders = await Promise.all(orders.map(async (order) => {
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
                    populatedOrders = populatedOrders.reverse()
                    console.log('populated orders'+populatedOrders);
                    console.log('populatedOrders[0].products:', populatedOrders[0].products);
                    res.render('user/yourOrders',{user:res.locals.user,populatedOrders})
                    populatedOrders.forEach(function (order) {
                        order.products.forEach(function (product) {
                            console.log(product.product.bookName);
                        });
                    });
                } else {
                    console.log('No customer found, customer has no orders, or orders is not an array');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },getCancel: async function(req,res){
        const user = await customerModel.findOneAndUpdate(
            { 
                phone: req.session.user, 
                'orders._id': req.params.orderId 
            },
            {
                $set: {
                    'orders.$.status': 'Cancelled',
                }
            },
            { new: true } 
        );
            res.redirect('/user/yourOrders')



    }
};
