const categoryModel = require('../../models/category');
const prodectModel = require('../../models/products')
const BannerModel = require('../../models/banner');
const customerModel = require('../../models/customers');
module.exports = {
    get: async function (req,res){
        let banners = await BannerModel.find();
        let categories = await categoryModel.find({Status:"Active"})
       let productsinDb = await prodectModel.find()
       let products = productsinDb.reverse()

        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
        }

        res.render('user/home',{categories,products,banners,user:res.locals.user})
    }
}