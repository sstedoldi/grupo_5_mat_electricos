//Primary modules
const express = require("express");
const { check } = require("express-validator");
const path = require("path");
//Router instance
const router = express.Router();
//Require multer
const multer = require("multer");

//Product validation - Todavia falta terminar
const productValidation = [
  check("brand").notEmpty().withMessage("Ingresar la marca"),
  check("model")
    .notEmpty()
    .withMessage("Ingresar el modelo o indicar 'sin modelo'"),
  check("category").notEmpty().withMessage("Ingresar la categoria"),
  check("subcategory").notEmpty().withMessage("Ingresar la subcategoria"),
  check("precio").notEmpty().withMessage("Ingresar el precio"),
  check("status").notEmpty().withMessage("Ingresar el estado"),
  check("description").notEmpty().withMessage("Ingresar la descripción"),
];

//Multer method
var multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/products");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
    console.log("img-" + Date.now() + path.extname(file.originalname));
  },
});

//Method upload
var upload = multer({ storage: multerStorage });

//Controllers
const productsController = require("../controllers/productsControllers.js");

////////////////
//Router methods
//Listado completo de productos
router.get("/", productsController.index);
//Detalla de un producto
router.get("/productDetail/:id", productsController.detail);
//Monstrar form para crear un producto
router.get("/create", productsController.create);
//Recibir datos del form para producto nuevo
router.post(
  "/",
  upload.single("image"),
  productValidation,
  productsController.store
);
//Form para modificar un producto, con boton "editar"
router.get("/edit/:id", productsController.edit);
//Recibir datos del form para producto editado
router.put("/:id", upload.single("image"), productsController.update); //FALTA EL MULTER ACA??? upload.single("image"),
//Eliminar un producto
router.delete("/delete/:id", productsController.delete);

//Cart
router.get("/productCart", productsController.cart);

//Busqueda de productos
router.get("/productSearch", productsController.search);

////
module.exports = router;
