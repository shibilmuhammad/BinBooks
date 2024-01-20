const mongoose = require('mongoose');
const Product = require('../../models/products');
const Customer = require('../../models/customers'); 

let gloabalOrders
const get = async function (req, res) {
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

        gloabalOrders = []
        let orders = transformedOrders.flat().reverse()
        gloabalOrders = orders;

        res.render('admin/adminOrders',{orders});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getEdit = async function(req,res){
    try {
        let [userId, orderId] = req.params.ids.split('-');

        let customer = await Customer.findOne({ _id: userId });
        
        let order = customer.orders.find(order => order._id.toString() === orderId);
        const populatedProducts = await Promise.all(order.products.map(async (product) => {
            const populatedProduct = await Product.findById(product.product).exec();
            return {
                ...product.toObject(),
                product: populatedProduct
            };
        }));
        order.products = populatedProducts;
       
        res.json({order,userId,orderId})




    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const postEdit = async function(req,res){
    let [userId, orderId] = req.params.ids.split('-');
    console.log('userId:', userId);
    console.log('orderId:', orderId);
    
    try {
        const user = await Customer.findOneAndUpdate(
            { 
                _id: userId, 
                'orders._id': orderId 
            },
            {
                $set: {
                    'orders.$.status': req.body.status,
                }
            },
            { new: true } 
        );
    
        console.log('user after update:', user);
    
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
    
        // Assuming this redirection is appropriate after the update
        res.redirect('/admin/orders');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},
postSearch = async function(req,res){
    try {
        let searchValue = req.body.searchValue.toLowerCase(); 

        const addressKeys = ['name', 'house', 'area', 'landMark', 'town', 'state'];


        const filteredOrders = gloabalOrders.filter(order => {
            const orderAddress = order.address;

            const addressMatch = addressKeys.some(key => orderAddress[key].toString().toLowerCase().includes(searchValue));


            const phoneMatch = order.phone.toString().toLowerCase().includes(searchValue);

            // Check if any other property in the order contains the searchValue
            const otherPropertyMatch = Object.values(order)
                .some(value => value && typeof value === 'string' && value.toLowerCase().includes(searchValue));

            return addressMatch || phoneMatch || otherPropertyMatch;
        });

        console.log('filtered orders'+filteredOrders);
        res.render('partials/admin/ordersTabledata',{ orders:filteredOrders})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},
postSort = async function(req,res){
    const sortStatus =req.body.sort
    if(sortStatus=="Newest first"){
      let orders =  gloabalOrders.sort(sortArraydate)
      res.render('partials/admin/ordersTabledata',{ orders:orders})
    }
    if(sortStatus=="Oldest First"){
      let orders =  gloabalOrders.sort(sortArraydate2)
      res.render('partials/admin/ordersTabledata',{ orders:orders})
    } if(sortStatus=="Ascending"){
        let orders =  gloabalOrders.sort(sortArrayPrice)
        res.render('partials/admin/ordersTabledata',{ orders:orders})
    } if(sortStatus=="Descending"){
        let orders =  gloabalOrders.sort(sortArrayPrice2)
        res.render('partials/admin/ordersTabledata',{ orders:orders})
    }
},
postFilter = async function(req,res){

    const filterStatus = req.body.filterValue.toLowerCase();

    const filteredOrders = gloabalOrders.filter(order => {
        const statusMatch = order.status.toString().toLowerCase() === filterStatus;
        return statusMatch;
    });
    res.render('partials/admin/ordersTabledata',{ orders:filteredOrders})
}
function sortArraydate(a,b){
    if(a.date < b.date){
      return 1
    }
    if(a.date > b.date){
      return -1
    }
    return 0;
  }
  function sortArraydate2(a,b){
    if(a.date < b.date){
      return -1
    }
    if(a.date > b.date){
      return 1
    }
    return 0;
  }
  function sortArrayPrice(a,b){
    if(a.totalOrderPrice < b.totalOrderPrice){
      return -1
    }
    if(a.totalOrderPrice > b.totalOrderPrice){
      return 1
    }
    return 0;
  }
  function sortArrayPrice2(a,b){
    if(a.totalOrderPrice < b.totalOrderPrice){
      return 1
    }
    if(a.totalOrderPrice > b.totalOrderPrice){
      return -1
    }
    return 0;
  }
  
  
module.exports = { get ,getEdit,postEdit,postSearch,postSort,postFilter};
