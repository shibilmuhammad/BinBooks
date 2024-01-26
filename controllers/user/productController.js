const prodectModel = require('../../models/products')
const customerModel = require('../../models/customers')
module.exports = {
    get: async function (req, res) {
        try {
            let productId = req.params.productId;
            let product = await prodectModel.findById(productId);
            let Products = await prodectModel.find({ category: product.category });
            let recommendedProducts = Products.reverse();

            let isProductInWishlist = false;
            if (req.session.user) {
                let user = await customerModel.findOne({ phone: req.session.user });

                if (user && user.wishList.some(item => item.product.equals(productId))) {
                    isProductInWishlist = true;
                }

                res.locals.user = user.name;
            }

            res.render('user/product', { product, recommendedProducts, user: res.locals.user, isProductInWishlist });
        } catch (error) {
            console.error('Error in product controller:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};
