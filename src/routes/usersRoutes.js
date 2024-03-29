//Primary modules
const express = require("express");
const { check } = require("express-validator");
const path = require("path");
//Router instance
const router = express.Router();
//Require multer
const multer = require("multer");

//Controllers
const usersController = require("../controllers/usersControllers.js");

//middleWares
const guestMiddleware = require("../middlewares/guestMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const adminMiddleware = require("../middlewares/adminMiddleware.js");

//Login validation
const loginValidation = [
  check("email").isEmail().withMessage("Ingrese un e-mail válido"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
];
//Register validation
const registerValidation = [
  check("name").isLength({ min: 2 }).withMessage("Debe ingresar un nombre"),
  check("lastName").isLength({ min: 2 })
    .withMessage("Debe ingresar un apellido"),
  check("birthDate").exists()
    .withMessage("Debe ingresar su fecha de nacimiento"),
  check("address").isLength({ min: 2 }).withMessage("Debe ingresar direccion"),
  check("email").isEmail().withMessage("Debe ingresar un e-mail valido"),
  check("password").isLength({ min: 8 })
    .withMessage("Debe ingresar una clave de mas de 8 caracteres"),
];

//Multer method
var multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() +".jpg"); 
  },
});

//Method upload
var upload = multer({ storage: multerStorage });

////////////////
//Router methods
router.get("/", usersController.index); //quito adminMiddleware
//Detalle de un usuario
router.get("/detail/:id", adminMiddleware, usersController.detail);
//Perfil del usuario logeado
router.get("/profile", authMiddleware, usersController.profile);
//View form login
router.get("/login", guestMiddleware, usersController.loginUser);
//Send login
router.post("/login", loginValidation, usersController.processLogin);
//Logout
router.get("/logout", usersController.logout);
//Register view
router.get("/register", guestMiddleware, usersController.register);
//Creating new user
router.post("/", upload.single("image"), registerValidation, usersController.registerUser);
//Edit user
router.get("/edit/:id",authMiddleware, usersController.editUser); //le quito el authMiddleware para trabajarlo mas facil
//Update user
router.put("/update/:id", upload.single("image"), authMiddleware, usersController.updateUser);
//Delete user
router.delete("/delete/:id", usersController.deleteUser);
router.delete("/deleteAdmin/:id", usersController.deleteUser);
////
//**Chequeos provisorios:
router.get("/check", usersController.check);
////
module.exports = router;
