//Primary modules
const express = require("express");

//Router instance
const router = express.Router();

//Require multer
const multer = require("multer");

//Require path
const path = require("path");

//Multer method
var multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/products");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});

//Method upload
var upload = multer({ storage: multerStorage });

//Controllers
const productsController = require("../controllers/productsControllers.js");

//Router methods
//Listado completo de productos:
router.get("/", productsController.index);
//Detalla de un producto
router.get("/productDetail/:id", productsController.detail);
//Monstrar form para crear un producto
router.get("/create", productsController.create);
//Recibir datos del form para producto nuevo
router.post("/", upload.single("productImage"), productsController.store);
//Form para modificar un producto, con boton "editar"
router.get("/edit/:id", productsController.edit);
//Recibir datos del form para producto editado
router.put("/:id", productsController.update);
//Eliminar un producto
router.delete("/delete/:id", productsController.delete);

//Cart
router.get("/productCart", productsController.cart);

//Busqueda de productos
router.get("/productSearch", productsController.search);

////
module.exports = router;
