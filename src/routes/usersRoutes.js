//Primary modules
const express = require("express");

//Controllers
const usersController = require("../controllers/usersControllers.js");

//Router instance
const router = express.Router();

//Require multer
const multer = require("multer");

//Require path
const path = require("path");

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
router.post("/login", [
  //check("email").isEmail().withMessage("Email Invalido"),
  //check("password").isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres")
],usersController.processLogin);
router.get("/check",function(req, res){
  if(req.session.usuarioLogueado == undefined){
    res.send("No estas logueado");
  }else{
    res.send("El usuario logueado es" + req.session.usuarioLogueado.email);
  }
})

//Views Create
router.get("/register", usersController.register);
//Create new user
router.post("/", upload.single("userImage") ,usersController.registerUser);
//Edit user
router.get("/userEdit/:idUser", usersController.updateUser);
//Update user
router.put("/:idUser", usersController.updateUser);
//Delete user
router.delete("/delete/:idUser", usersController.deleteUser);
////

module.exports = router;
