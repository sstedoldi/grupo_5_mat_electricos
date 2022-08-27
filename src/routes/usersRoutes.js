//Primary modules
const express = require("express");

//Controllers
const usersController = require("../controllers/usersControllers.js");

//Router instance
const router = express.Router();

//Router methods
router.get("/login", usersController.login);
router.get("/register", usersController.register);

////
module.exports = router;
