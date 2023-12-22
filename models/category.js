const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    categoryName:String,
    Status:String,
    categoryDescription:String,
    imageUrl:String,
    cloudinaryId:String,
    path:String,
})

module.exports = mongoose.model("Category",categorySchema);