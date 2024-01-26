
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
  postFilter: async function (req,res){
    const filterStatus =req.body.filterValue;

    if(filterStatus =='allProducts'){
      let productsData = await productModel.find()
      let products = productsData.reverse()
      res.render('partials/admin/productsTabledata',{ products:products})
    }else if (filterStatus =='below100'){
      let products = await productModel.find({ salePrice: { $lt: 100 } })
      res.render('partials/admin/productsTabledata',{ products:products})
    }else if (filterStatus =='100-200'){
      let products = await productModel.find({ salePrice:  { $gte: 100, $lte: 200 } })
      res.render('partials/admin/productsTabledata',{ products:products})
    }else if (filterStatus =='200-300'){
      let products = await productModel.find({ salePrice:  { $gte: 200, $lte: 300 } })
      res.render('partials/admin/productsTabledata',{ products:products})
    }else if (filterStatus =='above300'){
      let products = await productModel.find({ salePrice:  { $gte: 300 } })
      res.render('partials/admin/productsTabledata',{ products:products})
    }else{
      let products = await productModel.find({category:filterStatus});
      res.render('partials/admin/productsTabledata',{ products:products})
    }
  },postSort:async function(req,res){
    const sortStatus =req.body.sort
    productsInDb = await productModel.find()
    if(sortStatus=="z-a"){
     let products =  productsInDb.sort(sortArrayZtoA)
     res.render('partials/admin/productsTabledata',{ products:products})
    }
    if(sortStatus=="a-z"){
      let products =  productsInDb.sort(sortArrayAtoZ)
      res.render('partials/admin/productsTabledata',{ products:products})
    }
    if(sortStatus=="Newest first"){
      let products =  productsInDb.reverse()
      res.render('partials/admin/productsTabledata',{ products:products})
    }
    if(sortStatus=="Oldest First"){
      let products =  productsInDb
      res.render('partials/admin/productsTabledata',{ products:products})
    } if(sortStatus=="Ascending"){
      let products =  productsInDb.sort(sortProductAscending)
      res.render('partials/admin/productsTabledata',{ products:products})
    } if(sortStatus=="Descending"){
      let products =  productsInDb.sort(sortProductDescending)
      res.render('partials/admin/productsTabledata',{ products:products})
    }
  },postSearch:async function(req,res){
    const searchValue =req.body.searchValue
    products = await productModel.find({ bookName: { $regex: new RegExp(searchValue, 'i') } })
    res.render('partials/admin/productsTabledata',{ products:products})
  }
};
function sortArrayZtoA(a,b){
  if(a.bookName < b.bookName){
    return 1
  }
  if(a.bookName > b.bookName){
    return -1
  }
  return 0;
}
function sortArrayAtoZ(a,b){
  if(a.bookName < b.bookName){
    return-1
  }
  if(a.bookName > b.bookName){
    return 1
  }
  return 0;
}
function sortProductAscending(a,b){
  if(a.salePrice < b.salePrice){
    return-1
  }
  if(a.salePrice > b.salePrice){
    return 1
  }
  return 0;
}
function sortProductDescending(a,b){
  if(a.salePrice > b.salePrice){
    return-1
  }
  if(a.salePrice <  b.salePrice){
    return 1
  }
  return 0; 
}
