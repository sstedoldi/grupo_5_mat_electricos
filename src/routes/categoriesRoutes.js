//Primary modules
const express = require("express");

//Controllers
const categoriesControllers = require("../controllers/categoriesControllers.js");

//Router instance
const router = express.Router();

//Router methods
router.get("/categoryList", categoriesControllers.index);

////
module.exports = router;
