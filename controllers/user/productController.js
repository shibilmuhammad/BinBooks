const prodectModel = require('../../models/products')
const customerModel = require('../../models/customers')
module.exports = {
    get:async function (req,res){
        let productId = req.params.productId
        let product = await prodectModel.findById(productId)
        let Products = await prodectModel.find({category:product.category})
        let recommendedProducts = Products.reverse()
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
        }
        res.render('user/product',{product,recommendedProducts,user:res.locals.user})
    }
}