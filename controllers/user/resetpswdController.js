const customerModel = require('../../models/customers');
const bcrypt = require('bcrypt');
const { use } = require('../../routes/user');
module.exports = {
    get: function (req,res){
        res.render('user/resetpswd')
    },post: async function(req,res){
        try {
            const userPhone = req.session.phoneNumber;
            const user = await customerModel.findOne({ phone: userPhone });

          if(user){
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            user.password = hashedPassword;
            await user.save()
            delete req.session.phoneNumber
            req.session.user = userPhone
            const returnTo = req.session.returnTo || '/user/home';
            delete req.session.returnTo;
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
            res.redirect(returnTo);
          }else{
            res.redirect('/user/login',{error:'something went wrong'});
          }
        } catch (error) {
            console.error('Error in forgotPasswordController.post:', error);
            res.send(error)
        }
    }
};
    
