const customerModel = require('../../models/customers')
module.exports = {


    get: async function (req,res){
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
            res.render('user/myAccount',{user:res.locals.user,categoryName:'My Account',customer:user})
        }else{
            res.redirect('user/login',{error:'something went wrong'})
        }
    },post: async function(req,res){
        let existingUser = await customerModel.findOne({ phone: req.body.number });

        if (existingUser) {
            console.log("Phone number already exists in the database. No changes made.");
            res.redirect('/user/myAccount');
            return;
        }
        let user = await customerModel.findOne({phone:req.session.user});
        console.log(req.body);
        user.phone = req.body.number;
        user.email = req.body.email;
        delete req.session.req.body.phone
        req.session.user = req.body.number
        await user.save()
        res.redirect('/user/myAccount')
    }
}