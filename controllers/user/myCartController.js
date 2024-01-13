const prodectModel = require('../../models/products');
const customerModel = require('../../models/customers')
const Mycart=[];
module.exports = {
    get:async function (req,res){

      let username;
      let myCart = [];
      
      if (req.session.user) {
          const user = await customerModel.findOne({ phone: req.session.user });
      
          if (user) {
              res.locals.user = user.name;
              username = res.locals.user;
      
              const userDetails = await customerModel.findOne({ phone: req.session.user });
      
              if (!userDetails) {
                  return res.redirect('/login');
              }
      
              const productIdsInCart = userDetails.myCart.map(item => item.product);
              const productsInCart = await prodectModel.find({ _id: { $in: productIdsInCart } });
              
              const quantityMap = new Map(userDetails.myCart.map(item => [item.product.toString(), item.count]));
              
              myCart = productsInCart.map(item => ({
                  ...item.toObject(),
                  quantity: quantityMap.get(item._id.toString()) || 0, // Default to 0 if quantity is not found
              }));
          }
      }
      
      res.render('user/myCart', { Mycart: myCart, user: username });


    },
    post:async function(req,res){
    //    res.json({ success: true, productName: productSelected.bookName });
       const userPhone = req.session.user;
       const productId = req.params.productId;
       const count = parseInt(req.body.count) || 1;
       try {
         const customer = await customerModel.findOne({phone:userPhone});
         const product = await prodectModel.findById(productId);
   
         if (customer && product) {
           const existingCartItemIndex = customer.myCart.findIndex(item => item.product.equals(productId));
   
           if (existingCartItemIndex !== -1) {
             customer.myCart[existingCartItemIndex].count += count;
           } else {
             customer.myCart.push({ product: productId, count });
           }
   
           await customer.save();
           res.json({ success: true, productId: productId, count: count });
         } else {
           res.status(404).json({ success: false, message: 'Customer or product not found.' });
         }
       } catch (error) {
         console.error('Error adding item to cart:', error);
         res.status(500).json({ success: false, message: 'Internal server error.' });
       }
     },
     postUpdate:async function(req,res) {
      const userPhone = req.session.user;
      try {
          const productId = req.params.productId;
          const newQuantity = req.body.quantity;
          const customer = await customerModel.findOne({ phone: userPhone });

          const productIndex = customer.myCart.findIndex(item => item.product.equals(productId));
        let myCart = []
          if (productIndex !== -1) {
              customer.myCart[productIndex].count = newQuantity;
              await customer.save();
              const productIdsInCart = customer.myCart.map(item => item.product);
              const productsInCart = await prodectModel.find({ _id: { $in: productIdsInCart } });
              
              const quantityMap = new Map(customer.myCart.map(item => [item.product.toString(), item.count]));
              
              myCart = productsInCart.map(item => ({
                  ...item.toObject(),
                  quantity: quantityMap.get(item._id.toString()) || 0, // Default to 0 if quantity is not found
              }));
              res.json({
                success: true,
                message: 'Quantity updated successfully',
                myCart: myCart,
            });
          } else {
              res.status(404).json({ success: false, message: 'Product not found in the cart' });
          }
      } catch (error) {
          console.error('Error updating quantity:', error);
          res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
  },removeget: async function(req,res){
    let productIdForRemove = req.params.productId
    const userPhone = req.session.user;
    const customer = await customerModel.findOne({ phone: userPhone });
    await customer.updateOne({ $pull: { myCart: { product: productIdForRemove } } });
    await customer.save();
    res.redirect('/user/myCart')
  }



    }
