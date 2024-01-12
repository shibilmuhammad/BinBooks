const prodectModel = require('../../models/products');
const customerModel = require('../../models/customers')
const Mycart=[];
module.exports = {
    get:async function (req,res){

        let username;
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
             username = res.locals.user
        }
        res.render('user/myCart',{Mycart,user:res.locals.user})

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