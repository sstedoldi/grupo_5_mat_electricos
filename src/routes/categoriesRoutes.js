//Primary modules
const express = require("express");

//Controllers
const categoriesControllers = require("../controllers/categoriesControllers.js");

//Router instance
const router = express.Router();

//Router methods
router.get("/categoryList", categoriesControllers.list);

////
module.exports = router;
