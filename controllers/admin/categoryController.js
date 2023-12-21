const categoryModel = require('../../models/category');
const upload = require('../../middlewares/multerandCloudinery');

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
        const category = await categoryModel.create({
          categoryName: req.body.categoryName,
          Status: req.body.status,
          categoryDescription: req.body.categoryDescription,
          imageUrl:req.file.path
        });
        res.redirect('/admin/category');
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};
