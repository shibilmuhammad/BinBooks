const customerModel = require('../../models/customers')
module.exports = {
    
    get: async function (req,res){
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
            let address = user.address
            if(address.length>0){
                res.render('user/address',{user:res.locals.user,address})
            }else{
                res.redirect('/user/buynow')
            }
            
        }
       
    },getaddress: async function(req,res){
        delete req.session.addressId;
        req.session.addressId =req.params.adressId
        req.session.addressSubmitted = true;
        res.redirect('/user/payment')
    }
}