const express = require('express');
const router = express.Router();
const customersController = require('../../controllers/admin/customerController');

router.get('/customers',customersController.showCustomersPage);
module.exports = router;