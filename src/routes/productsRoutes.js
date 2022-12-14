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
  check("brand_id").notEmpty().withMessage("Ingresar la marca"),
  check("vat").notEmpty().withMessage("Ingresar el IVA"),
  check("discount").isLength({min:1}).withMessage("Ingresar el descuento"),
  check("stock").notEmpty().withMessage("Ingresar el Stock inicial"),
  check("stock_min").notEmpty().withMessage("Ingresar el Stock minimo"),
  check("category_id").notEmpty().withMessage("Ingresar la categoria"),
  check("subcategory_id").notEmpty().withMessage("Ingresar la subcategoria"),
  check("nonvatPrice").notEmpty().withMessage("Ingresar el precio"),
  check("description").notEmpty().withMessage("Ingresar la descripción"),
  check("image").custom((value, {req}) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg",".png", ".gif"];
    
    if (file){
        let fileExtension = path.extname(file.originalname);
        if(!acceptedExtensions.includes(fileExtension)){
            throw new Error(`Las extensiones de archivos permitidas son: ${acceptedExtensions.join(", ")}`)
        }
    } 
    return true;
}),
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
//Listado de productos por categorias
//router.get("/categorias/:id", productsController.categorias)
//CATEGORIAS
router.get("/cables", productsController.cables)
router.get("/lamparas", productsController.lamparas)
router.get("/iluminacion", productsController.iluminacion)
router.get("/hogar", productsController.hogar)
router.get("/seguridad", productsController.seguridad)
router.get("/domiciliaria", productsController.domiciliaria)
router.get("/solar", productsController.solar)
router.get("/herramientas", productsController.herramientas)
router.get("/industria", productsController.industria)
router.get("/redes", productsController.redes)
router.get("/saldos", productsController.saldos)
router.get("/porteros", productsController.porteros)
router.get("/via", productsController.via)
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
router.put("/:id", productValidation, upload.single("image"), productsController.update); 
//Eliminar un producto
router.delete("/delete/:id", productsController.delete);

//Cart
router.get("/productCart", productsController.cart);

//Busqueda de productos
router.get("/productSearch", productsController.search);

////
module.exports = router;
