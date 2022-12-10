////Primary modules
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
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
    db.Users.findAll().then((users) => {
      res.render("users", { users });
    });
  },
  //
  //
  detail: (req, res) => {
    db.Users.findByPk(req.params.id, {
    })
      .then((user) => {
        res.render("userDetail.ejs", { user });
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
    req.image = req.file ? req.file.filename : "default-image.png";
    let password = bcrypt.hashSync(req.body.password, 10);

    db.Users.create({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      birthDate: req.body.birthDate,
      password: password,
      address: req.body.address,
      image: req.image,
      condition_id: 2,
    })
      .then(() => {
        return res.redirect("/users/login/");
      })
      .catch((error) => res.send(error));

  },
  //
  //
  loginUser: (req, res) => {
    res.render("login.ejs");
  },
  //
  //
  processLogin: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Users.findOne({
        where: { email: req.body.email },
      })
        .then((user) => {
          if (user) {
            let isPasswordOk = bcrypt.compareSync(req.body.password, user.password);
            if (isPasswordOk) {
              req.session.user = user;

              // Cookies
              if (req.body.recordame != undefined) {
                res.cookie("recordame", user.email, { maxAge: 30000000 });
              }
              res.redirect("/");
            } else {
              res.render("login", { errors: errors, oldData: req.body });
            }
          }
          else {
            res.render("login", { errors: errors, oldData: req.body });
          }
        });
    } else {
      res.render("login", { errors: errors, oldData: req.body });
    }
  },

  // function (req, res) {
  //    let errors = validationResult(req);
  //    if (errors.isEmpty()) {
  //      let usersJSON = fs.readFileSync("./src/data/users.json", {
  //       // Traigo a todos los usuarios registrados
  //        errors: errors.errors,
  //      });
  //      let users;
  //      if (usersJSON == "") {
  //        users = [];
  //      } else {
  //        users = JSON.parse(usersJSON);
  //      }
  //      let usuarioALoguearse;
  //      for (let user of users) {
  //        if (user.email == req.body.email) {
  //          if (bcrypt.compareSync(req.body.password, user.password)) {
  //            usuarioALoguearse = user;
  //            break;
  //          }
  //        }
  //      }
  //      if (usuarioALoguearse == undefined) {
  //        return res.render("login", {
  //          errors: [{ msg: "Credenciales invalidas" }],
  //        });
  //      }
  //      //Session
  //      req.session.user = usuarioALoguearse;
  //      //Recordame
  //      if (req.body.recordame != undefined) {
  //        res.cookie("recordame", usuarioALoguearse.email, { maxAge: 300000 }); //dejo la cookie en 5 minutos
  //      }
  //      //Provisorio
  //      res.redirect("/");
  //    } else {
  //      return res.render("login", { errors: errors.errors });
  //    }
  //  },


  logout: (req, res) => {
    req.session.user = undefined;
    res.clearCookie('recordame');
    req.session.destroy();
    //Agrego el false de esta variable
    res.locals.isAnUserLogged = false;

    return res.redirect("/");
  },
  //
  //
  profile: (req, res) => {
    // res.render("profile", { user: req.session.user });
    db.Users.findByPk(req.session.user.id, {
    })
      .then((user) => {
        res.render("profile", { user });
      });
  },
  //
  //
  editUser: (req, res) => {

    let userId = req.params.id;
    let userToEdit = db.Users.findByPk(userId, {

    });

    Promise.all([userToEdit])
      .then(([userToEdit]) => {
        res.render("userEdit", {
          userToEdit,

        });
      })
      .catch((error) => res.send(error));
  },
  //
  //
  updateUser: (req, res) => {
    let userId = req.params.id;
    let userToEdit = db.Users.findByPk(userId)

      // Promise.all([userToEdit])
      .then((userToEdit) => {
        res.render("userEdit", {
          userToEdit,

        });
      })
      .catch((error) => res.send(error));
    db.Users.update(
      {
        ...req.body,
        image: req.file ? req.file.filename : userToEdit.image,
      },
      {
        where: { id: userId },
      }
    )
    if (
      res.locals.isAnUserLogged &&
      res.locals.user.email == "admin@admin.com"
    ){
    return res.redirect("/users/detail/" + userId)
    } else {
      return res.redirect("/users/profile")
    }
  },
  //
  //
  deleteUser: (req, res) => {

    let id = req.params.id;
    db.Users.destroy({ where: { id: id }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => { 
        if (
        res.locals.isAnUserLogged &&
        res.locals.user.email == "admin@admin.com"
      ){
      return res.redirect("/users/")
      } else {
        req.session.user = undefined
        return res.redirect("/")
      }
        
      })
      .catch((error) => res.send(error));
  },
  //
  //**Provisorio
  check: (req, res) => {
    if (req.session.user == undefined) {
      res.send("No estas logueado");
    } else {
      res.send("El usuario logueado es" + req.session.user.email);
    }
  },
  //
  //
};

////
module.exports = usersController;
