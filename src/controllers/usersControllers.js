////Primary modules
const fs = require("fs");
const path = require("path");

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
  register: (req, res)=>{
    res.render("register");
  },
  detail: (req, res) => {
    let idUser = req.params.idUser;
    let user = users.find((oneUser) => oneUser.idUser == idUser);
    res.render("userDetail", {
      users,
      toThousand,
    });
  },
  registerUser: (req, res) => {
    let newUser = {
      idUser: users[users.length - 1].idUser + 1,
      ...req.body,
      usersImage: req.file ? req.file.filename : "default-image.png",      
    };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
    res.redirect("/users/"); 
  },

  editUser: (req, res) => {
    let idUser = req.params.idUser;
    let userToEdit = users.find((oneUser) => oneUser.idUser == idUser);

    res.render("/userEdit", {
      userToEdit
    });
  },  
  updateUser: (req, res) => {
    let idUser = req.para
    ms.idUser;
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

  deleteUser: (req, res)=>{
    let idUser = req.params.idUser;
    let finalUsers = users.filter((user) => user.idUser != idUser);
    fs.writeFileSync(
      usersFilePath,
      JSON.stringify(finalUsers, null, " ")
    );
    res.redirect("/usersList/"); //hacia una ruta
  }
};

////
module.exports = usersController;
