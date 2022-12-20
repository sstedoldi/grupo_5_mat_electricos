const express = require("express");
const router = express.Router();
const apiUserController = require("../../controllers/api/apiUserController");

//Listado completo de usuarios
// router.get("/users", apiUserController.users);
router.get("/api", apiUserController.users);
//Detalle de un producto
router.get("/api/:id", apiUserController.usersId);
//Ultimo producto agregado
router.get("/apiLastUser", apiUserController.lastUser);

module.exports = router;
