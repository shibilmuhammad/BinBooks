const customerModel = require('../../models/customers')
module.exports = {
    get: async function (req,res){
        let username;
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
             username = res.locals.user
             if(!req.session.addressSubmitted){
                res.redirect('/user/address')
            }else{
                res.render('user/payment',{user:username})
            }
        }else{
            res.redirect('/user/login')
        }
    },post: async function(req,res){
        req.session.paymentSubmitted = true
        res.redirect('/user/placeOrder')
    }
}