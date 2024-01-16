const customerModel = require('../../models/customers')
const { ObjectId } = require('mongodb');
module.exports = {
    get: async function (req,res){
        if (req.session.user) {
            let user = await customerModel.findOne({phone:req.session.user})
            res.locals.user = user.name;
        }
        res.render('user/buynow',{user:res.locals.user,categoryName:'Address'})
    },getBuy :async function(req,res){
        let productId = req.params.productId;
        let productObject = {
            product: new ObjectId(productId),
            count: 1,
          };
        delete req.session.productIds;
        req.session.productsIds =  [];
        req.session.productsIds = [productObject]
        if(req.session.user){
            let user = await customerModel.findOne({phone:req.session.user});
            if(user.address.length<1){
                res.redirect('/user/buynow')
            }else{
                res.redirect('/user/address')
            }
        }
    },post :async function(req,res){
        let user = await customerModel.findOne({phone:req.session.user});
        user.address.push({
            name:req.body.name,
            phone:req.body.number,
            house:req.body.house,
            area:req.body.area,
            landMark:req.body.landMark,
            pinCode:req.body.pinCode,
            town:req.body.town,
            state:req.body.state,         
        })
        await user.save()
        res.redirect('/user/address')
    },postAddress :async function(req,res){
        let addressId = req.params.addressId;
        const user = await customerModel.findOneAndUpdate(
            { 
                phone: req.session.user, 
                'address._id': addressId 
            },
            {
                $set: {
                    'address.$.name': req.body.name,
                    'address.$.number': req.body.number,
                    'address.$.house': req.body.house,
                    'address.$.area': req.body.area,
                    'address.$.landMark': req.body.landMark,
                    'address.$.pinCode': req.body.pinCode,
                    'address.$.town': req.body.town,
                    'address.$.state': req.body.state,
                }
            },
            { new: true } 
        );
        console.log(user.address);
        res.redirect('/user/address')
    }
}