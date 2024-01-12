const categoryModel = require('../../models/category');
const customerModel = require('../../models/customers')
module.exports = {
    get:  async function (req,res){
        const categories = await categoryModel.find({Status:"Active"});
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
        }
        res.render('user/category',{categories,user:res.locals.user})
    }
}