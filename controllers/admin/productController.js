
const productModel = require('../../models/products');
const categoryModel = require('../../models/category');
const upload = require('../../middlewares/multer');
const cloudinary = require('../../util/cloudinary')
module.exports = {
  get: async function (req, res) {
    try {
      const productsinDb = await productModel.find();
      const products = productsinDb.reverse()
      const category = await categoryModel.find()
      res.render('admin/adminProducts', { products,category});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  post: async function (req, res) {
    try {
      upload.single('productImage')(req, res, async function (err) {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
          const result =await cloudinary.uploader.upload(req.file.path)
          const product = await productModel.create({
            bookName:req.body.bookName,
            author:req.body.author,
            MRP:req.body.mrp,
            discount:req.body.discount,
            delCharge:req.body.delcharge,
            pages:req.body.pages,
            width:req.body.width,
            height:req.body.height,
            category:req.body.category,
            condition:req.body.condition,
            status:req.body.status,
            publisher:req.body.publisher,
            discription:req.body.discription,
            imageUrl:result.secure_url,
            cloudinaryId:result.public_id,
            path:req.file.path
        });
        res.redirect('/admin/products');
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}