const prodectModel = require('../../models/products')
const Mycart=[];
module.exports = {
    get: function (req,res){
        console.log(Mycart)
        res.render('user/myCart',{Mycart})

    },
    post:async function(req,res){
        productId = req.params.productId
        let productSelected = await prodectModel.findById(productId)
        if(productSelected){
            Mycart.push(productSelected)
        }
       res.json({ success: true, productName: productSelected.bookName });
    }
}