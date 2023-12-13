const express = require('express');
const router = express.Router();
const yourOrdersController = require('../../controllers/user/yourOrdersController')
router.get('/yourOrders',yourOrdersController.showyourOrdersPage);
module.exports = router;