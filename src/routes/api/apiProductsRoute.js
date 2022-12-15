//Primary modules
const express = require("express");
const { check } = require("express-validator");
const path = require("path");
//Router instance
const router = express.Router();

//Controllers
const apiProductsController = require("../../controllers/api/apiProductsController.js");
////////////////
//Router methods
//Listado completo de productos
router.get("/api", apiProductsController.products);
router.get("/api/:id", apiProductsController.productsId);
//Listado de productos por categorias
//router.get("/categorias/:id", productsController.categorias)
//CATEGORIAS
// router.get("/cables", apiProductsController.cables)
// router.get("/lamparas", apiProductsController.lamparas)
// router.get("/iluminacion", apiProductsController.iluminacion)
// router.get("/hogar", apiProductsController.hogar)
// router.get("/seguridad", apiProductsController.seguridad)
// router.get("/domiciliaria", apiProductsController.domiciliaria)
// router.get("/solar", apiProductsController.solar)
// router.get("/herramientas", apiProductsController.herramientas)
// router.get("/industria", apiProductsController.industria)
// router.get("/redes", apiProductsController.redes)
// router.get("/saldos", apiProductsController.saldos)
// router.get("/porteros", apiProductsController.porteros)
// router.get("/via", apiProductsController.via)
//Detalla de un producto
//router.get("/productDetail/:id", apiProductsController.detail);
//Monstrar form para crear un producto
//router.get("/create", apiProductsController.create);
//Recibir datos del form para producto nuevo
//router.post("/",upload.single("image"),apiProductValidation, apiProductsController.store);
//Form para modificar un producto, con boton "editar"
//router.get("/edit/:id", apiProductsController.edit);
//Recibir datos del form para producto editado
//router.put("/:id", apiProductValidation, upload.single("image"), apiProductsController.update); 
//Eliminar un producto
//router.delete("/delete/:id", apiProductsController.delete);

//Cart
//router.get("/productCart", apiProductsController.cart);

//Busqueda de productos
//router.get("/productSearch", apiProductsController.search);

////
module.exports = router;
