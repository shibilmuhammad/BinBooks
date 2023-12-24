const categoryModel = require('../../models/category');
const upload = require('../../middlewares/multer');
const cloudinary = require('../../util/cloudinary')
module.exports = {
  get: async function (req, res) {
    try {
      const categoriesinDb = await categoryModel.find();
      const categories = categoriesinDb.reverse()
      res.render('admin/adminCategory', { categories });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  post: async function (req, res) {
    try {
      upload.single('categoryImage')(req, res, async function (err) {
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
  postDelete: async function (req,res){
    idforDelete = req.body.deleteId;
    let DeleteCategory =  await categoryModel.findByIdAndDelete(idforDelete);
    cloudinary.uploader.destroy(DeleteCategory.cloudinaryId)
    res.redirect('/admin/category')
  },
  postSearch: async function(req,res){
    let searchResult = req.body.categorySearch;
    res.redirect(`/admin/category/searcResult?sv=${searchResult}`);
  },
  searchRenderGet: async function(req,res){
    let searchResult = req.query.sv;
    const categories = await categoryModel.find({ categoryName: { $regex: new RegExp(searchResult, 'i') } });
    res.render('admin/adminCategory',{ categories:categories, searchvalue:searchResult})
  },
  postFilter: async function (req,res){
    const filterStatus =req.body.filterValue
    if(filterStatus =='All'){
      let categoriesData = await categoryModel.find()
      let categories = categoriesData.reverse()
      res.render('partials/admin/CategoryTabledata',{ categories:categories})
    }else if(filterStatus=='filterBy'){
      let categoriesData = await categoryModel.find()
      let categories = categoriesData.reverse()
      res.render('partials/admin/CategoryTabledata',{ categories:categories})
    }
    else{
      let categories = await categoryModel.find({Status:filterStatus})
      res.render('partials/admin/CategoryTabledata',{ categories:categories})
    }
   
  },
  postSort:async function(req,res){
    const sortStatus =req.body.sort
    categoriesInDb = await categoryModel.find()
    if(sortStatus=="z-a"){
     let categories =  categoriesInDb.sort(sortArrayZtoA)
     res.render('partials/admin/CategoryTabledata',{ categories:categories})
    }
    if(sortStatus=="a-z"){
      let categories =  categoriesInDb.sort(sortArrayAtoZ)
      res.render('partials/admin/CategoryTabledata',{ categories:categories})
    }
   
    if(sortStatus=="Newest first"){
      let categories =  categoriesInDb.reverse()
      res.render('partials/admin/CategoryTabledata',{ categories:categories})
    }
    if(sortStatus=="Oldest First"){
      let categories =  categoriesInDb
      res.render('partials/admin/CategoryTabledata',{ categories:categories})
    }
  },
};
function sortArrayZtoA(a,b){
  if(a.categoryName < b.categoryName){
    return 1
  }
  if(a.categoryName > b.categoryName){
    return -1
  }
  return 0;
}
function sortArrayAtoZ(a,b){
  if(a.categoryName < b.categoryName){
    return-1
  }
  if(a.categoryName > b.categoryName){
    return 1
  }
  return 0;
}