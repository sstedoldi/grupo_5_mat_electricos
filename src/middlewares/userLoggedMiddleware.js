function userLoggedMiddleware(req, res, next) {
  res.locals.isAnUserLogged = false;
  if (req.session.usuarioLogueado != undefined) {
    res.locals.isAnUserLogged = true;
    res.locals.usuarioLogueado = req.session.usuarioLogueado;
    if (res.locals.usuarioLogueado.email == "admin@admin.com") {
      res.locals.adminLogged = true;
    }
  }
  //console.log (res.locals.usuarioLogueado);
  next();
}

module.exports = userLoggedMiddleware;
