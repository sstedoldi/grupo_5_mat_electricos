////Primary modules
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

//Data managing
const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

//REGEX of thousand
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Controller definition
const usersController = {
  index: (req, res) => {
    res.render("users", {
      users,
      toThousand,
    });
  },
  loginUser: (req, res) => {
    res.render("login.ejs");
  },
  processLogin: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      //Traigo a todos los usuarios registrados
      let usersJSON = fs.readFileSync("./src/data/users.json", {
        errors: errors.errors,
      });
      let users;
      if (usersJSON == "") {
        users = [];
      } else {
        users = JSON.parse(usersJSON);
      }
      //Busco al usuario el usuario ingresado
      //for (let i = 0; i < users.length; i++) { //Cambio a for in
      for (let user in users) {
        if (user.email == req.body.email) {
          //Cambio de users a user
          if (bcrypt.compareSync(req.body.password, user.password)) {
            //adapto por el cambio del for
            var usuarioALoguearse = user;
            break;
          }
        }
      }
      //Si no se hayó usuarioALoguearse, envío el error
      if (usuarioALoguearse == undefined) {
        return res.render("login", {
          errors: [{ msg: "Credenciales invalidas" }],
        });
      }
      //Session
      req.session.usuarioLogueado = usuarioALoguearse;
      //Provisorio
      res.render("success");
    } else {
      return res.render("login", { errors: errors.errors });
    }
  },

  detail: (req, res) => {
    let idUser = req.params.idUser;
    let user = users.find((oneUser) => oneUser.idUser == idUser);
    res.render("userDetail", {
      users,
      toThousand,
    });
  },

  register: (req, res) => {
    res.render("register");
  },

  registerUser: (req, res) => {
    let errors = validationResult(req);
    console.log(errors.mapped());
    if (!errors.isEmpty()) {
      let oldData = req.body;
      return res.render("register", { errors: errors.mapped(), oldData });
    } else {
      let newUser = {
        ...req.body,
        image: req.file ? req.file.filename : "default-image.png",
      };
      users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
      res.redirect("/users/");
    }
  },

  editUser: (req, res) => {
    let idUser = req.params.idUser;
    let userToEdit = users.find((oneUser) => oneUser.idUser == idUser);

    res.render("/userEdit", {
      userToEdit,
    });
  },
  updateUser: (req, res) => {
    let idUser = req.params.idUser;
    let userToEdit = users.find((oneUsers) => oneUsers.idUser == idUser);
    userToEdit = {
      idUser: userToEdit.idUser,
      ...req.body,
      imagen: userToEdit.imagen,
    };

    let newUser = users.map((users) => {
      //nueva variable con todos los usuario + el editado
      if (users.idUser == userToEdit.idUser) {
        return (users = { ...userToEdit });
      }
      return users;
    });

    fs.writeFileSync(usersFilePath, JSON.stringify(newUser, null, " "));
    res.redirect("/users/");
  },

  deleteUser: (req, res) => {
    let idUser = req.params.idUser;
    let finalUsers = users.filter((user) => user.idUser != idUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, " "));
    res.redirect("/usersList/"); //hacia una ruta
  },
};

////
module.exports = usersController;
