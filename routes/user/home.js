const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/user/homeController')
router.get('/home',homeController.showHomepage);
module.exports = router;