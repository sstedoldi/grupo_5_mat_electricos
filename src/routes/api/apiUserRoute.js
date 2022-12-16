const express = require('express');
const router = express.Router();
const apiUserController = require('../../controllers/api/apiUserController');

router.get('/users', apiUserController.users);
router.get('/users/detail/:id', apiUserController.usersId);


module.exports = router;