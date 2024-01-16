const customerModel = require('../../models/customers')
module.exports = {
    get: async function (req, res) {
        try {
            if (req.session.user) {
                let user = await customerModel.findOne({ phone: req.session.user });
                res.locals.user = user.name;
    
                let context = { user: res.locals.user, categoryName: 'Payment method' };
    
                if (req.session.paymentSubmitted) {
                    context.selectedPaymentMethod = req.session.paymentSubmitted;
                }
    
                if (!req.session.addressSubmitted) {
                    res.redirect('/user/address');
                } else {
                    res.render('user/payment', context);
                }
            } else {
                res.redirect('/user/login');
            }
        } catch (error) {
            console.error('Error in payment controller:', error);

    }
    
    },post: async function(req,res){
        req.session.paymentSubmitted = req.body.payment
        res.redirect('/user/placeOrder')
    }
}