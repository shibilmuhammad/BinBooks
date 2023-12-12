const express = require('express');
const router = express.Router();
const buynowController = require('../../controllers/user/buynowController')
router.get('/buynow',buynowController.showbuynowPage);
module.exports = router;