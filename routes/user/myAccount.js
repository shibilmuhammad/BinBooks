const express = require('express');
const router = express.Router();
const myAccountController = require('../../controllers/user/myAccountController')
router.get('/myAccount',myAccountController.showmyAccountPage);
module.exports = router;