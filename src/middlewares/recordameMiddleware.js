function recordameMiddleware(req, res, next) {
  next();
  if (req.cookies.recordame && !req.session.usuarioLogueado) {
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
    for (let user in users) {
      if (user.email == req.cookies.email) {
        var usuarioALoguearse = user;
        break;
      }
    }
    //Session
    req.session.usuarioLogueado = usuarioALoguearse;
  }
}

module.exports = recordameMiddleware;
