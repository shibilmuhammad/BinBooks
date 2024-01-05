const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    count: { type: Number, default: 1 },
  });
const wishListSchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:'product'}
})
const ordersSchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
    date:Date
})
const customerSchema = mongoose.Schema({
   name:String,
   phone:Number,
   gender:String,
   password:String,
    myCart : [cartItemSchema],
    wishList:[wishListSchema],
    orders:[ordersSchema]
})

module.exports = mongoose.model("customers",customerSchema);