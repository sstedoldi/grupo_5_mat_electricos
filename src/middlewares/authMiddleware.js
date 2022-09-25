function authMiddleware(req, res, next) {
  if (req.session.usuarioLogueado) {
    //uso el falsy como condicional
    next();
  } else {
    res.render("login");
  }
}

module.exports = authMiddleware;
