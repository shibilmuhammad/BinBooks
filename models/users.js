const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:String,
    phone:Number
})
module.exports = mongoose.model("user",userSchema)