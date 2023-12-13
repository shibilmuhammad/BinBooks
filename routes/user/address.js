const express = require('express');
const router = express.Router();
const addressController = require('../../controllers/user/addressController')
router.get('/address',addressController.showaddressPage);
module.exports = router;