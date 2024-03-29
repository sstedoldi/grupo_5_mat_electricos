const express = require('express');
const router = express.Router();
const apiCategoriesController = require('../../controllers/api/apiCategoriesController');

router.get('/', apiCategoriesController.list);
router.get('/detail/:id', apiCategoriesController.detail);


module.exports = router;