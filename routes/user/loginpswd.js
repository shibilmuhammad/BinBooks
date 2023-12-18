const express = require('express');
const router = express.Router();
const loginpswdController = require('../../controllers/user/loginpswdController')
router.get('/loginpswd',loginpswdController.showloginpswdPage);
module.exports = router;