const mongoose = require('mongoose');
 const Customer = require('../../models/customers')
 const Product = require('../../models/products');

module.exports = {
    get: async function (req,res){
        try {
            const allUserOrders = await Customer.find({}, 'orders');
            const transformedOrders = await Promise.all(
                allUserOrders.map(async (userOrder) => {
                    const userId = userOrder._id;
                    // Fetch user details
                    const user = await Customer.findById(userId, 'phone');
                        const processedOrders = await Promise.all(
                            userOrder.orders.map(async (order) => {
                                // Fetch product details
                                const productDetails = await Promise.all(
                                    order.products.map(async (product) => {
                                        const productId = product.product;
                                        // Fetch product details from Product model
                                        const productInfo = await Product.findById(productId);
                                        // Calculate the total price for each product in the order
                                        const totalPricePerProduct = productInfo.salePrice * product.count;
                                        return {
                                            productId: productId,
                                            productName: productInfo.name,
                                            price: totalPricePerProduct,
                                        };
                                    })
                                );
                                // Calculate the total price for all products in the order
                                const totalOrderPrice = productDetails.reduce((total, product) => total + product.price, 0);
                                // Create a single object for the entire order
                                const orderDetails = {
                                    orderId: order._id, // Add orderId to the orderDetails object
                                    userId: userId,
                                    address: order.address,
                                    phone: user.phone,
                                    date: order.date.toLocaleString(),
                                    status:order.status,
                                    products: productDetails,
                                    totalOrderPrice: totalOrderPrice + 40,
                                };
    
                                return orderDetails;
                            })
                        );
                    return processedOrders.flat()
                })
            );
            let orders = transformedOrders.flat().reverse()
            const sumOfTotalOrderPrice = orders.reduce((total, order) => {
                if (order.status !== 'Cancelled') {
                    return total + order.totalOrderPrice;
                }
                return total;
            }, 0);
            const countOfOrders = orders.length;
            const productsCount = await Product.countDocuments()
            const maleCustomersCount = await Customer.countDocuments({ gender: 'male' });

// Count of female customers
const femaleCustomersCount = await Customer.countDocuments({ gender: 'female' });

console.log('Male customers count:', maleCustomersCount);
console.log('Female customers count:', femaleCustomersCount);
            console.log('sum is '+sumOfTotalOrderPrice);
            console.log('count is',countOfOrders);
            res.render('admin/adminDashboard',{orders,totalSales:sumOfTotalOrderPrice,ordersCount:countOfOrders,productsCount,males:maleCustomersCount,females:femaleCustomersCount});
            console.log('pproducts count s',productsCount);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
}