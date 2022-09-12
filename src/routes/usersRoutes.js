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

router.get("/login", usersController.loginUser);
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
