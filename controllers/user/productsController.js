const prodectModel = require('../../models/products')
module.exports = {
    get: async function (req,res){
        categoryName = req.params.categoryName;
       let products =  await prodectModel.find({category:categoryName});
        res.render('user/products',{products})
    }
}