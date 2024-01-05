const mongoose = require('mongoose');
const bannerSchema = mongoose.Schema({
    title:String,
    startDate:Date,
    endDate:Date,
    imageUrl:String,
    cloudinaryId:String,
    path:String,
})
module.exports = mongoose.model("banner",bannerSchema);