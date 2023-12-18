const express = require('express');
const router = express.Router();
const createAccountController = require('../../controllers/user/createAccountController')
router.get('/createAccount',createAccountController.showcreateAccountPage);
module.exports = router;