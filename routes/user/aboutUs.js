const express = require('express');
const router = express.Router();
const aboutUsController = require('../../controllers/user/aboutUsController')
router.get('/aboutUs',aboutUsController.showaboutUsPage);
module.exports = router;