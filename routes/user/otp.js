const express = require('express');
const router = express.Router();
const otpController = require('../../controllers/user/otpController')
router.get('/otp',otpController.showotpPage);
module.exports = router;