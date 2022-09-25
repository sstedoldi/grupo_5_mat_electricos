//Primary modules
const express = require("express");
//Router instance
const router = express.Router();
//Require multer
const multer = require("multer");
//Require path
const path = require("path");
//Require express validator
const { check } = require("express-validator");

//Controllers
const usersController = require("../controllers/usersControllers.js");

//middleWares
const guestMiddleware = require("../middlewares/guestMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

//Multer method
var multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});

//Method upload
var upload = multer({ storage: multerStorage });

//Router methods
router.get("/", usersController.index);
//Detalla de un usuario
router.get("/userDetail/:idUser", usersController.detail);
//View form login
router.get("/login", usersController.loginUser);
//Send login
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Ingrese un e-mail válido"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres"),
  ],
  usersController.processLogin
);
router.get("/check", function (req, res) {
  if (req.session.usuarioLogueado == undefined) {
    res.send("No estas logueado");
  } else {
    res.send("El usuario logueado es" + req.session.usuarioLogueado.email);
  }
});

//Views Create
router.get("/register", guestMiddleware, usersController.register);
//Create new user
router.post(
  "/",
  upload.single("userImage"),
  [
    check("name").isLength({ min: 2 }).withMessage("Debe ingresar un nombre"),
    check("lastName")
      .isLength({ min: 2 })
      .withMessage("Debe ingresar un apellido"),
    check("years")
      .isNumeric()
      .withMessage("Debe ingresar su edad sin espacios"),
    check("email").isEmail().withMessage("Debe ingresar un email valido"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("Debe ingresar una clave de mas de 3 caracteres"),
    check("pass_confirm")
      .isLength({ min: 3 })
      .withMessage("Debe ingresar una clave de mas de 3 caracteres"),
  ],
  usersController.registerUser
);
//Edit user
router.get("/userEdit/:idUser", usersController.updateUser);
//Update user
router.put("/:idUser", usersController.updateUser);
//Delete user
router.delete("/delete/:idUser", usersController.deleteUser);
////

module.exports = router;
