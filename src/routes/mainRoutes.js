//Primary modules
const express = require("express");

//Controllers
const mainController = require("../controllers/mainControllers.js");

//Router instance
const router = express.Router();

//Router methods
router.get("/", mainController.home);

////
module.exports = router;
