const bcrypt = require('bcrypt');
const customerModel = require('../../models/customers')
module.exports = {
    post: async function(req,res){

        const phoneNumber = req.session.phoneNumber;
        try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = await customerModel.create({
            name:req.body.name,
            phone:phoneNumber,
            email:req.body.email,
            gender:req.body.gender,
            password : hashedPassword,
            status:'Active',
        })
        delete req.session.phoneNumber
        req.session.user = phoneNumber
        const returnTo = req.session.returnTo || '/user/home';
        delete req.session.returnTo;
        res.redirect(returnTo);
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    }
