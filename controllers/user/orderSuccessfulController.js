const customerModel = require('../../models/customers')
module.exports = {
    get:async function (req,res){
        if(!req.session.orderSuccessful){
            res.redirect('/user/home')
        }
        let username;
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
             username = res.locals.user
             delete req.session.orderSuccessful ;
             res.render('user/orderSuccessful',{getDeliveryDate,categoryName:'Order Success',user:username});
        }
      
    }
}
function getDeliveryDate(days) {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + days);

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = deliveryDate.toLocaleDateString('en-US', options);
    return formattedDate;
}