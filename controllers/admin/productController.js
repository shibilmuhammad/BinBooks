
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
        let discountamount = (req.body.discount * req.body.mrp)/100
        let saleamount =Math.round(req.body.mrp - discountamount)
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
            description:req.body.description,
            imageUrl:result.secure_url,
            cloudinaryId:result.public_id,
            path:req.file.path,
            salePrice:saleamount
        });
        

        res.redirect('/admin/products');
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  postDelete: async function (req,res){
    idforDelete = req.body.deleteId;
    let DeleteProduct =  await productModel.findByIdAndDelete(idforDelete);
    cloudinary.uploader.destroy(DeleteProduct.cloudinaryId)
    res.redirect('/admin/products')
  },
  getEdit: async function(req,res){
    let itemId = req.params.id
     let item = await productModel.findById(itemId)
     res.json({item})
   },
   postEdit: async function(req,res){
    try {
      upload.single('productImageEdit')(req, res, async function (err) {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        let productId = req.body.editId
        let productForEdit = await productModel.findById(productId);
        let result
        if(req.file){
          await cloudinary.uploader.destroy(productForEdit.cloudinaryId);
          result = await cloudinary.uploader.upload(req.file.path)
          console.log()
          console.log(req.file.path)
        }
        let updatedData={}
        let discountamount = (req.body.discount * req.body.mrp)/100
        let saleamount =Math.round(req.body.mrp - discountamount)
        if(req.file){
           updatedData={
             bookName:req.body.bookName,
            author:req.body.author || productForEdit.author,
            MRP:req.body.mrp || productForEdit.MRP,
            discount:req.body.discount || productForEdit.discount,
            delCharge:req.body.delcharge || productForEdit.delCharge,
            pages:req.body.pages || productForEdit.pages,
            width:req.body.width || productForEdit.width,
            height:req.body.height || productForEdit.height,
            category:req.body.category || productForEdit.category,
            condition:req.body.condition || productForEdit.condition,
            status:req.body.status || productForEdit.status,
            publisher:req.body.publisher || productForEdit.publisher,
            description:req.body.description || productForEdit.description,
            imageUrl:result.secure_url || productForEdit.imageUrl,
            cloudinaryId:result.public_id || productForEdit.cloudinaryId,
            path:req.file.path || productForEdit.path,
            salePrice:saleamount

          }
        }else{
          updatedData =  {bookName:req.body.bookName || productForEdit.bookName,
            author:req.body.author || productForEdit.author,
            MRP:req.body.mrp || productForEdit.MRP,
            discount:req.body.discount || productForEdit.discount,
            delCharge:req.body.delcharge || productForEdit.delCharge,
            pages:req.body.pages || productForEdit.pages,
            width:req.body.width || productForEdit.width,
            height:req.body.height || productForEdit.height,
            category:req.body.category || productForEdit.category,
            condition:req.body.condition || productForEdit.condition,
            status:req.body.status || productForEdit.status,
            publisher:req.body.publisher || productForEdit.publisher,
            description:req.body.description || productForEdit.description,
            salePrice:saleamount
        }
      }
        await productModel.findByIdAndUpdate(productId, updatedData);
        res.redirect('/admin/products')
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
}