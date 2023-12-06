const express = require('express');
const router = express.Router();

const bannerController = require('../../controllers/admin/bannerController');

router.get('/banner',bannerController.showBannerPage)
module.exports = router;