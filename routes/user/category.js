const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/user/categoryController')
router.get('/category',homeController.showCategoryPage);
module.exports = router;