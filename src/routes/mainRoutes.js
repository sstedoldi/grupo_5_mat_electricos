//Primary modules
const express = require("express");

//Controllers
const mainController = require("../controllers/mainControllers.js");

//Router instance
const router = express.Router();

//Router methods
router.get("/", mainController.home);
//Quienes somos
router.get("/quienes", mainController.quienes);
//Analytics del negocio
router.get("/analytics", mainController.analytics);
////
module.exports = router;
