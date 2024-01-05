const BannerModel = require('../../models/banner');
const upload = require('../../middlewares/multer');
const cloudinary = require('../../util/cloudinary')
module.exports = {
    get: async function (req,res){
        let banners = await BannerModel.find()
        res.render('admin/adminBannermanage',{banners})
    },
    getEdit: async function(req,res){
        let bannerId = req.params.bannerId;
        let BannerForEdit = await BannerModel.findById(bannerId)
        res.json(BannerForEdit)
      },
    post: async function(req,res){

         try {
          upload.single('bannerImage')(req, res, async function (err) {
            if (err) {
              console.error(err);
              return res.status(500).send('Internal Server Error');
            }
            let editBannerId = req.body.editBannerId
            let bannerForEdit = await BannerModel.findById(editBannerId);
            let result
            if(req.file){
              await cloudinary.uploader.destroy(bannerForEdit.cloudinaryId);
              result = await cloudinary.uploader.upload(req.file.path)
            }
            let updatedData={}
            if(req.file){
               updatedData={
                title:req.body.title || bannerForEdit.title,
                startDate:req.body.startDate || bannerForEdit.startDate,
                endDate:req.body.endDate || bannerForEdit.endDate,
                imageUrl:result.secure_url || bannerForEdit.imageUrl,
                cloudinaryId:result.public_id || bannerForEdit.cloudinaryId,
                path:req.file.path || bannerForEdit.path,   
              }
            }else{
              updatedData =  {title:req.body.title || bannerForEdit.title,
                startDate:req.body.startDate || bannerForEdit.startDate,
                endDate:req.body.endDate || bannerForEdit.endDate,
            }
          }
            await BannerModel.findByIdAndUpdate(editBannerId, updatedData);
            res.redirect('/admin/banner')
          });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }

    }
}