const express = require('express');
const router = express.Router();
const searchResultController = require('../../controllers/user/searchResultController')
router.get('/searchResult',searchResultController.showsearchResultPage);
module.exports = router;