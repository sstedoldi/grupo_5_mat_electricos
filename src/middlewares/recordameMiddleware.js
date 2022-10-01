////Primary modules
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

function recordameMiddleware(req, res, next) {
  next();
  if (
    req.cookies.recordame != undefined &&
    req.session.usuarioLogueado == undefined
  ) {
    let usersJSON = fs.readFileSync(usersFilePath, "utf-8");
    let users;
    if (usersJSON == "") {
      users = [];
    } else {
      users = JSON.parse(usersJSON);
    }
    //Busco al usuario ingresado
    let usuarioALoguearse;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == req.cookies.recordame) {
        usuarioALoguearse = users[i];
        break;
      }
    }
    //Session
    req.session.usuarioLogueado = usuarioALoguearse;
  }
}

module.exports = recordameMiddleware;
