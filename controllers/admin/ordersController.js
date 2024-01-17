customersModel = require('../../models/customers')
module.exports = {
    get:async function (req,res){
        const allUserOrders = await customersModel.find({}, 'orders'); 
        console.log(allUserOrders)
        res.render('admin/adminOrders')
    }
}