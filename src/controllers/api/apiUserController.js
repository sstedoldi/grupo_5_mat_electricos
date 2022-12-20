let db = require("../../database/models");
const Op = db.Sequelize.Op;

//Controller api definition
const apiUserController = {
  //
  //lista todos los usuarios
  users: (req, res) => {
    db.Users.findAll().then((users) => {
      return res.status(200).json({
        total: users.length,
        data: users,
        status: 200,
      });
    });
  },
  //
  //detalle de un usuario
  usersId: (req, res) => {
    db.Users.findByPk(req.params.id).then((users) => {
      return res.status(200).json({
        data: users,
        status: 200,
      });
    });
  },
  //
  //Ultimo usuario agregado
  lastUser: (req, res) => {
    db.Users.findAll({
      limit: 1,
      order: [["id", "DESC"]],
    })
      .then((user) => {
        return res.status(200).json({
          data: user,
          status: 200,
        });
      })
      .catch((error) => res.send(error));
  },
};

module.exports = apiUserController;
