const customerModel = require('../../models/customers')
module.exports = {
    get:async function (req,res){
        let username;
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
             username = res.locals.user
        }
        res.render('user/orderSuccessful',{user:username})
    }
}