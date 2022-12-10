function adminMiddleware(req, res, next) {
  if (
    res.locals.isAnUserLogged &&
    res.locals.user.email == "admin@admin.com"
  ) {
    next();
  } else {
    //**Completar con un render con la opción de volver atras o de logout y loguearse como admin
    res.send("Esta página es para administradores");
  }
}

module.exports = adminMiddleware;
