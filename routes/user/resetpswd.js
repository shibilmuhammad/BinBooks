const express = require('express');
const router = express.Router();
const resetpswdController = require('../../controllers/user/resetpswdController')
router.get('/resetpassword',resetpswdController.showresetpswdPage);
module.exports = router;