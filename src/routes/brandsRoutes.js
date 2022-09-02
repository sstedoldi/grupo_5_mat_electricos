//Primary modules
const express = require("express");

//Controllers
const brandsControllers = require("../controllers/brandsControllers.js");

//Router instance
const router = express.Router();

//Router methods
router.get("/brandList", brandsControllers.index);

////
module.exports = router;
