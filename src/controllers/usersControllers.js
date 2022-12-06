////Primary modules
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("../database/models");
// const sequelize = db.sequelize;
// const { Op } = require("sequelize");

//Llamo al modelo User
const Users = db.User;
const Orders = db.Order;
const Conditions = db.Condition;

//Data managing
//const usersFilePath = path.join(__dirname, "../data/users.json");
//const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

//REGEX of thousand
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Controller definition
const usersController = {
  index: (req, res) => {
    // res.render("users", {
    //   users,
    //   toThousand,
    // });
    db.Users.findAll().then((users) => {
      res.render("users", { users });
    });
  },
  //
  //
  detail: (req, res) => {
    // let userId = req.params.id;
    // let user = users.find((oneUser) => oneUser.id == userId);
    // res.render("userDetail", {
    //   user,
    // });
    db.User.findByPk(req.params.id, {
      include: ["orders"],
    }).then((user) => {
      res.render("userEdit.ejs", { user });
    });
  },
  //
  //
  register: (req, res) => {
    res.render("register");
  },
  //
  //
  registerUser: (req, res) => {
    // let errors = validationResult(req);
    // // console.log(errors.mapped());
    // if (!errors.isEmpty()) {
    //   let oldData = req.body;
    //   console.log(errors.mapped());
    //   return res.render("register", { errors: errors.mapped(), oldData });
    // } else {



      // let newUser = {
      //   id: users.length == 0 ? 1 : users[users.length - 1].id + 1,
      //   ...req.body,
      //   password: bcrypt.hashSync(req.body.password, 10),
      //   userImage: req.file ? req.file.filename : "default-image.png",
      // };
      // users.push(newUser);
      // fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
      // return res.redirect("/users/login/");
      req.image = req.file ? req.file.filename : "default-image.png",
      req.password = bcrypt.hashSync(req.body.password, 10),
      db.Users.create({
        //id: users.length == 0 ? 1 : users[users.length - 1].id + 1,
        ...req.body
      })
      .then(() => {
          console.log("pase por aca")
          return res.redirect("/users/login/");
        })
        .catch((error) => res.send(error));
    // }
  },
  //
  //
  loginUser: (req, res) => {
    res.render("login.ejs");
  },
  //
  //
  processLogin: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let usersJSON = fs.readFileSync("./src/data/users.json", {
        //Traigo a todos los usuarios registrados
        errors: errors.errors,
      });
      let users;
      if (usersJSON == "") {
        users = [];
      } else {
        users = JSON.parse(usersJSON);
      }
      let usuarioALoguearse;
      for (let user of users) {
        if (user.email == req.body.email) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            usuarioALoguearse = user;
            break;
          }
        }
      }
      if (usuarioALoguearse == undefined) {
        return res.render("login", {
          errors: [{ msg: "Credenciales invalidas" }],
        });
      }
      //Session
      req.session.usuarioLogueado = usuarioALoguearse;
      //Recordame
      if (req.body.recordame != undefined) {
        res.cookie("recordame", usuarioALoguearse.email, { maxAge: 300000 }); //dejo la cookie en 5 minutos
      }
      //Provisorio
      res.redirect("/");
    } else {
      return res.render("login", { errors: errors.errors });
    }
  },
  //
  //
  logout: (req, res) => {
    req.session.usuarioLogueado = undefined;
    //Agrego el false de esta variable
    res.locals.isAnUserLogged = false;

    res.redirect("/");
  },
  //
  //
  profile: (req, res) => {
    res.render("profile", { user: req.session.usuarioLogueado });
  },
  //
  //
  editUser: (req, res) => {
    // let userId = req.params.id;
    // let userToEdit = users.find((oneUser) => oneUser.id == userId);
    // res.render("userEdit", {
    //   userToEdit,
    // });
    let userId = req.params.id;
    let promUsers = Users.findByPk(userId, {
      include: ["orders", "condition"],
    });
    let promOrders = Orders.findAll();
    let promConditions = Conditions.findAll();
    Promise.all([promUsers, promOrders, promConditions])
      .then(([User, allOrders, allConditions]) => {
        return res.render(path.resolve(__dirname, "..", "views", "usersEdit"), {
          User,
          allOrders,
          allConditions,
        });
      })
      .catch((error) => res.send(error));
  },
  //
  //
  updateUser: (req, res) => {
    // let id = req.params.id;
    // let userToEdit = users.find((oneUsers) => oneUsers.id == id);
    // userToEdit.name = req.body.name,
    // userToEdit.userImage =  req.file ? req.file.filename : userToEdit.userImage;
    //        // // userToEdit = {
    //        // //   id: userToEdit.id,
    //        // //   password: userToEdit.password,
    //        // //   ...req.body,
    //        // //   image: req.file ? req.file.filename : userToEdit.imagen, //mantengo imagen vieja si no carga una nueva
    //        // // };
    // let newUser = users.map((users) => {
    //   //nueva variable con todos los usuario + el editado
    //   if (users.id == userToEdit.id) {
    //     console.log(users)
    //     console.log(userToEdit)
    //     return (users = { ...userToEdit });
    //   }
    //   return users;
    // });
    // fs.writeFileSync(usersFilePath, JSON.stringify(newUser, null, " "));
    // res.redirect("/");
    let id = req.params.id;
    Users.update(
      {
        name: req.body.name,
        userImage: req.file ? req.file.filename : userToEdit.userImage,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        email: req.body.email,
        password: req.body.password,
        conditions: req.body.conditions,
      },
      {
        where: { id: id },
      }
    )
      .then(() => {
        return res.redirect("/");
      })
      .catch((error) => res.send(error));
  },
  //
  //
  deleteUser: (req, res) => {
    // let id = req.params.id;
    // let finalUsers = users.filter((user) => user.id != id);
    // fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, " "));
    // req.session.usuarioLogueado = undefined;
    // res.redirect("/"); //hacia una ruta
    let id = req.params.id;
    Users.destroy({ where: { id: id }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => {
        req.session.usuarioLogueado = undefined;
        return res.redirect("/");
      })
      .catch((error) => res.send(error));
  },
  //
  //
  deleteUsersAdmin: (req, res) => {
    // let id = req.params.id;
    // let finalUsers = users.filter((user) => user.id != id);
    // fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, " "));
    // res.redirect("/"); //hacia una ruta
    let id = req.params.id;
    Users.destroy({ where: { id: id }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => {
        return res.redirect("/");
      })
      .catch((error) => res.send(error));
  },
  //
  //**Provisorio
  check: (req, res) => {
    if (req.session.usuarioLogueado == undefined) {
      res.send("No estas logueado");
    } else {
      res.send("El usuario logueado es" + req.session.usuarioLogueado.email);
    }
  },
  //
  //
};

////
module.exports = usersController;
