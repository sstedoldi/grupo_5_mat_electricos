//Primary modules
const express = require("express");

//Controllers
const productsController = require("../controllers/productsControllers.js");

//Router instance
const router = express.Router();

//Router methods
router.get("/productDetail", productsController.detail);
router.get("/productCart", productsController.cart);

////
module.exports = router;
