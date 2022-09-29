////Primary modules
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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
  //
  //
  detail: (req, res) => {
    let idUser = req.params.idUser;
    let user = users.find((oneUser) => oneUser.idUser == idUser);
    res.render("userDetail", {
      user,
      toThousand,
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
    let errors = validationResult(req);
    // console.log(errors.mapped());
    if (!errors.isEmpty()) {
      let oldData = req.body;
      console.log(errors.mapped());
      return res.render("register", { errors: errors.mapped(), oldData });
    } else {
      let newUser = {
        id: users.length == 0 ? 1 : users[users.length - 1].id + 1,
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
        userImage: req.file ? req.file.filename : "default-image.png",
      };
      users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
      return res.redirect("/users/login/");
    }
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
      if (req.body.recordame) {
        //Uso el truty
        res.cookie("recordame", usuarioALoguearse.email, { maxAge: 120000 });
      }
      //Provisorio
      res.redirect("/");
    } else {
      return res.render("login", { errors: errors.errors });
    }
  },
  //
  //
  logout:(req, res)=>{
		req.session.usuarioLogueado = undefined;
    //users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); 
    //Esta linea la puso el profe en su proyecto pero si la descomento
    //se rompe el logout. Sin esto funciona bien.
		res.redirect("/");
	},
  //
  //
  check:(req, res) => {
    if (req.session.usuarioLogueado == undefined) {
      res.send("No estas logueado");
    } else {
      res.send("El usuario logueado es" + req.session.usuarioLogueado.email);
    }
  },
  //
  //
  editUser: (req, res) => {
    let idUser = req.params.idUser;
    let userToEdit = users.find((oneUser) => oneUser.idUser == idUser);

    res.render("/userEdit", {
      userToEdit,
    });
  },
  //
  //
  profile: (req, res)=>{

		res.render("profile", {user:req.session.usuarioLogueado})

	},
  //
  //
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
  //
  //
  deleteUser: (req, res) => {
    let idUser = req.params.idUser;
    let finalUsers = users.filter((user) => user.idUser != idUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, " "));
    res.redirect("/usersList/"); //hacia una ruta
  },
};

////
module.exports = usersController;
