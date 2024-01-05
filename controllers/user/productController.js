const prodectModel = require('../../models/products')
module.exports = {
    get:async function (req,res){
        let productId = req.params.productId
        let product = await prodectModel.findById(productId)
        let Products = await prodectModel.find({category:product.category})
        let recommendedProducts = Products.reverse()
        res.render('user/product',{product,recommendedProducts})
    }
}