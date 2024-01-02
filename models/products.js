const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    bookName:String,
    author:String,
    MRP:Number,
    discount:Number,
    delCharge:Number,
    pages:Number,
    width:Number,
    height:Number,
    category:String,
    condition:String,
    status:String,
    Date:Number,
    publisher:String,
    description:String,
    imageUrl:String,
    cloudinaryId:String,
    path:String,
    salePrice:Number,
})

module.exports = mongoose.model("product",productSchema);