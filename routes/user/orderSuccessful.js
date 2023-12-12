const express = require('express');
const router = express.Router();
const orderSuccessfulController = require('../../controllers/user/orderSuccessfulController')
router.get('/orderSuccessful',orderSuccessfulController.showorderSuccessfulPage);
module.exports = router;