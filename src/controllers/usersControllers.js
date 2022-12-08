////Primary modules
const fs = require("fs");
const express = require("express");
const multer = require("multer");
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
      req.image = req.file ? req.file.filename : "default-image.png",
      req.password = bcrypt.hashSync(req.body.password, 10),
      db.Users.create({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email, 
        birthDate: req.body.birthDate, 
        password: req.body.password,
        address: req.body.address,
        image: req.image, 
        condition_id: 2,
        
      })
      .then(() => {
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
    res.clearCookie('recordame');
    req.session.destroy();
    //Agrego el false de esta variable
    res.locals.isAnUserLogged = false;

   return res.redirect("/");
  },
  //
  //
  profile: (req, res) => {
    res.render("profile", { user: req.session.usuarioLogueado });
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
      .then(() => {
        console.log("Pase por aca")
        return res.redirect("/users/detail/" + userId)
      })
      .catch((error) => res.send(error));
  },
  //
  //
  deleteUser: (req, res) => {
  
    let id = req.params.id;
    db.Users.destroy({ where: { id: id }, force: true }) // force: true es para asegurar que se ejecute la acción
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
    db.Users.destroy({ where: { id: id }, force: true }) // force: true es para asegurar que se ejecute la acción
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
