//Data managing

//Controller definition
const usersController = {
  login: (req, res) => {
    res.render("login");
  },
  register: (req, res) => {
    res.render("register");
  },
};

////
module.exports = usersController;
