const categoryModel = require('../../models/category');
const upload = require('../../middlewares/multer');
const cloudinary = require('../../util/cloudinary')
module.exports = {
  get: async function (req, res) {
    try {
      const categories = await categoryModel.find();
      res.render('admin/adminCategory', { categories });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  post: async function (req, res) {
    try {
      upload.single('categoryImage')(req, res, async function (err) {
        console.log(req.file)
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        const result =await cloudinary.uploader.upload(req.file.path)
        const category = await categoryModel.create({
          categoryName: req.body.categoryName,
          Status: req.body.status,
          categoryDescription: req.body.categoryDescription,
          imageUrl:result.secure_url,
          cloudinaryId:result.public_id,
          path:req.file.path
        });
        res.redirect('/admin/category');
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  getEdit: async function(req,res){
   let itemId = req.params.id
    let item = await categoryModel.findById(itemId)
    res.json({item})
  },
  postEdit: async function(req,res){
    try {
      upload.single('editImg')(req, res, async function (err) {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        let categoryId = req.body.id
        let categoryForEdit = await categoryModel.findById(categoryId);
        let result
        if(req.file){
          await cloudinary.uploader.destroy(categoryForEdit.cloudinaryId);
          result = await cloudinary.uploader.upload(req.file.path)
        }
        let updatedData={}
        if(req.file){
           updatedData={
            categoryName: req.body.categoryName||categoryForEdit.categoryName,
            Status: req.body.status || categoryForEdit.Status,
            categoryDescription: req.body.categoryDescription || categoryForEdit.categoryDescription,
            imageUrl:result.secure_url || categoryForEdit.imageUrl,
            cloudinaryId:result.public_id || categoryForEdit.cloudinaryId,
             path:req.file.path || categoryForEdit.path
          }
        }else{
          updatedData =  {categoryName: req.body.categoryName||categoryForEdit.categoryName,
          Status: req.body.status || categoryForEdit.Status,
          categoryDescription: req.body.categoryDescription || categoryForEdit.categoryDescription,
        }
      }
        await categoryModel.findByIdAndUpdate(categoryId, updatedData);
        res.redirect('/admin/category')
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    
  },
};
