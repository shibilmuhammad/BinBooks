const categoryModel = require('../../models/category');
const prodectModel = require('../../models/products')
const BannerModel = require('../../models/banner');
module.exports = {
    get: async function (req,res){
        let banners = await BannerModel.find();
        let categories = await categoryModel.find({Status:"Active"})
       let productsinDb = await prodectModel.find()
       let products = productsinDb.reverse()
        res.render('user/home',{categories,products,banners})
    }
}