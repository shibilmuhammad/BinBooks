const express = require('express');
const router = express.Router();
const myCartController = require('../../controllers/user/myCartController')
router.get('/myCart',myCartController.showmyCartPage);
module.exports = router;