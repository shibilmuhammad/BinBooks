const categoryModel = require('../../models/category');
module.exports = {
    get:  async function (req,res){
        const categories = await categoryModel.find({Status:"Active"});
        res.render('user/category',{categories})
    }
}