//Primary modules
const express = require("express");

//Controllers
const productsController = require("../controllers/productsControllers.js");

//Router instance
const router = express.Router();

//Router methods
//Listado completo de productos:
router.get("/", productsController.index);
//Detalla de un producto
router.get("/productDetail/:id", productsController.detail);
//Monstrar form para crear un producto
router.get("/create", productsController.create);
//Recibir datos del form para producto nuevo
router.post("/", productsController.store);
//Form para modificar un producto, con boton "editar"
router.get("/edit/:id", productsController.edit);
//Recibir datos del form para producto editado
router.put("/:id", productsController.update);
//Eliminar un producto
router.delete("/:id", productsController.delete);

//Cart
router.get("/productCart", productsController.cart);

////
module.exports = router;
