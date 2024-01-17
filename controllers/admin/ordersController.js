const mongoose = require('mongoose');
const Product = require('../../models/products');
const Customer = require('../../models/customers'); 


const get = async function (req, res) {
    try {
        const allUserOrders = await Customer.find({}, 'orders');
        // Transform the data
        const transformedOrders = await Promise.all(
            allUserOrders.map(async (userOrder) => {
                const userId = userOrder._id;

                // Fetch user details
                const user = await Customer.findById(userId, 'phone');

                // Process each order in the user's orders array
                // Process each order in the user's orders array
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

                // Flatten the processed orders array
                return processedOrders.flat()
            })
        );


        let orders = transformedOrders.flat()
            console.log(orders);

        res.render('admin/adminOrders',{orders});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { get };
