const customerModel = require('../../models/customers');
const bcrypt = require('bcrypt');

module.exports = {
    get: async function(req,res){
        res.render('user/loginpswd')
    }, 
    post: async function (req, res) {
        try {
            const phoneNumber = req.session.phoneNumber;
            const enteredPassword = req.body.password;
            const user = await customerModel.findOne({ phone: phoneNumber });
            if (!user) {
                res.render('user/loginpswd', { error: 'User not found' });
                return;
            }
            const passwordMatch = await bcrypt.compare(enteredPassword, user.password);
            if (passwordMatch) {
                delete req.session.phoneNumber
                req.session.user = phoneNumber
                const returnTo = req.session.returnTo || '/user/home';
                delete req.session.returnTo;
                res.redirect(returnTo);
            } else {
                res.render('user/loginpswd', { error: 'Incorrect password' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};
