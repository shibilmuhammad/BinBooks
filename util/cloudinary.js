require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dcfcq3cji',
    api_key: process.env.cloudinary_Api_Key,
    api_secret: process.env.cloudinary_Secret_Key,
});
module.exports = cloudinary;