const express = require('express');
const router = express.Router();
const wishListController = require('../../controllers/user/wishListController')
router.get('/wishList',wishListController.showwishListPage);
module.exports = router;