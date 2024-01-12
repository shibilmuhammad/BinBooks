
const customerModel = require('../../models/customers')
module.exports = {
    get: function (req,res){
        res.render('user/login')
    },
    post: async function (req, res){
        try {
            const customers = await customerModel.find();
            const customerNumber = req.body.customerPhone;
            const userExists = customers.some(element => element.phone == customerNumber);
            req.session.phoneNumber = customerNumber;
            if (req.session.user) {
                let user = await customerModel.findOne({phone:req.session.user})
                res.locals.user = user.name;
            }
            if (userExists) {
                res.redirect('/user/loginpassword')
            } else {
                res.render('user/createAccount')
            }
            
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    
}