const customerModel = require('../../models/customers')
module.exports = {
    
    get: async function (req,res){
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
        }
        res.render('user/contactUs',{user:res.locals.user,categoryName:'Contact Us'})
    }
}