const customerModel = require('../../models/customers');
const prodectModel = require('../../models/products');

module.exports = {
    get: async function (req, res) {
        let username;
        let myCart = [];

        if (req.session.user) {
            const userDetails = await customerModel.findOne({ phone: req.session.user });

            if (!userDetails) {
                return res.redirect('/login');
            }

            const productIdsInCart = userDetails.wishList.map(item => item.product);
            const wishList = await prodectModel.find({ _id: { $in: productIdsInCart } });

            res.locals.user = userDetails.name;
            username = res.locals.user;

            res.render('user/wishList', { wishList, user: res.locals.user,categoryName:'Wish List' });
        }
    },

    post: async function(req, res) {
        try {
            const productId = req.params.productId;
            const userPhone = req.session.user;

            const customer = await customerModel.findOne({ phone: userPhone });
            if(!req.session.user){
                res.json({success: false, })
            }else{
                const existingWishlistItem = customer.wishList.find(item => item.product.equals(productId));

                if (existingWishlistItem) {
                    customer.wishList.pull(existingWishlistItem._id);
                    await customer.save();
                    res.json({ success: true, message: 'Removed from wishlist' });
                } else {
                    customer.wishList.push({ product: productId });
                    await customer.save();
                    res.json({ success: true, message: 'Added to wishlist' });
                }
            }
           
        } catch (error) {
            console.error('Error in wishlistController.post:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    getremove: async function(req, res) {
        try {
            let productIdForRemove = req.params.productId;
            const userPhone = req.session.user;
            const customer = await customerModel.findOne({ phone: userPhone });
            await customer.updateOne({ $pull: { wishList: { product: productIdForRemove } } });
            await customer.save();
            res.redirect('/user/wishList');
        } catch (error) {
            console.error('Error in wishlistController.getremove:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};
