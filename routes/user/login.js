const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/user/loginController')
router.get('/login',loginController.showloginPage);
module.exports = router;