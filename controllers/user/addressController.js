const customerModel = require('../../models/customers')
module.exports = {
    
    get: async function (req,res){
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
            let address = user.address.reverse()
            if(address.length>0){
                res.render('user/address',{user:res.locals.user,address,categoryName:'Address'})
            }else{
                res.redirect('/user/buynow')
            }
            
        }
       
    },getaddress: async function(req,res){
        delete req.session.addressId;
        req.session.addressId =req.params.adressId
        req.session.addressSubmitted = true;
        res.redirect('/user/payment')
    },getEdit :async function(req,res){
        console.log(req.params.addressId);
        let user = await customerModel.findOne({phone:req.session.user})
        let addresses = user.address.filter(addr => addr._id == req.params.addressId);
        let address = addresses.length > 0 ? addresses[0] : null;
        console.log('addressname',address.name);
        res.render('user/buynow',{address})
    }   
}