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
    let filterValue = req.body.categoryFilter;
    res.redirect(`/admin/category/filterResult?fv=${filterValue}`)
  },
  filterResultGet:async function(req,res){
    let filterValue =req.query.fv;
      let categories
      if(filterValue=='All'){
        categories = await categoryModel.find()
      }else{
        categories = await categoryModel.find({Status:filterValue})
      }
       res.render('admin/adminCategory',{ categories:categories,filterValue})
    
  },
  postSort:async function(req,res){
    sortStatus =req.body.sortValue
    categories = await categoryModel.find()
    if(sortStatus=="z-a"){
     let sortResult =  categories.sort(sortArrayZtoA)
     res.redirect(`/admin/category/sortResult?Sv=${JSON.stringify(sortResult)}&sortStatus=${sortStatus}`)
    }
    if(sortStatus=="a-z"){
      let sortResult =  categories.sort(sortArrayAtoZ)
     res.redirect(`/admin/category/sortResult?Sv=${JSON.stringify(sortResult)}&sortStatus=${sortStatus}`)
    }
   
    if(sortStatus=="Newest first"){
      let sortResult =  categories.reverse()
     res.redirect(`/admin/category/sortResult?Sv=${JSON.stringify(sortResult)}&sortStatus=${sortStatus}`)
    }
    if(sortStatus=="Oldest First"){
      let sortResult =  categories
     res.redirect(`/admin/category/sortResult?Sv=${JSON.stringify(sortResult)}&sortStatus=${sortStatus}`)
    }
  },
  sortResult:async function(req,res){
    let  categories = JSON.parse(req.query.Sv)
    let sortStatus = req.query.sortStatus
    res.render('admin/adminCategory',{ categories:categories,sortStatus:sortStatus})
  }
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