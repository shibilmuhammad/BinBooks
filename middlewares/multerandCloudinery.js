//Cloudinary and multer
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name: 'dcfcq3cji',
    api_key: '861167655669645',
    api_secret: 'Z5fTeUL5gHA4cdj5VvXtsgpqWJk',
  });
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'uploads', 
    allowedFormats: ['jpg', 'jpeg', 'png'],
  });
  const parser = multer({ storage: storage });
  module.exports =parser