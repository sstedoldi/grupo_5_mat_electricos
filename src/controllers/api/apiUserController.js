
let db = require("../../database/models");
const Op = db.Sequelize.Op;

//Controller api definition
const apiUserController = {
  //lista todos los productos
  users: (req, res) => {
    db.Users.findAll()
    .then(users => {
     return res.status(200).json({
        total: users.length,
        data: users,
        status: 200,
      });
    });
  },
    usersId: (req, res) => {
      db.Users.findByPk(req.params.id)
      .then(users => {
       return res.status(200).json({
          data: users,
          status: 200,
        });
      });
  }}

module.exports = apiUserController;
