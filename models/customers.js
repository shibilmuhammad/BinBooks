const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    count: { type: Number, default: 1 },
  });
const wishListSchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:'product'}
})

const addressSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    house:String,
    area:String,
    landMark:String,
    pinCode:Number,
    town:String,
    state:String,
})
const ordersSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
            count: Number,
        }
    ],
    date: Date,
    paymentMethod:String,
    address: addressSchema,
    status:String
})
const customerSchema = mongoose.Schema({
   name:String,
   phone:Number,
   email:String,
   gender:String,
   password:String,
    myCart : [cartItemSchema],
    wishList:[wishListSchema],
    address:[addressSchema],
    orders:[ordersSchema],
    status:String,
    forgotPasswordOTP: Number, 
})

module.exports = mongoose.model("customers",customerSchema);