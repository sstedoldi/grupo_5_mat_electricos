//Primary modules
const express = require("express");
const { check } = require("express-validator");
const path = require("path");
//Router instance
const router = express.Router();

//Controllers
const apiProductsController = require("../../controllers/api/apiProductsController.js");
////////////////
//API Router methods
//Listado completo de productos
router.get("/api", apiProductsController.products);
//Detalle de un producto
router.get("/api/:id", apiProductsController.productsId);
//Ultimo producto agregado
router.get("/apiLastProduct", apiProductsController.lastProduct);

////
module.exports = router;
