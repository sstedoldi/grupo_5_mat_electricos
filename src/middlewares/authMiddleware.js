function authMiddleware(req, res, next) {
  if (req.session.usuarioLogueado) {
    //uso el truty como condicional
    next();
  } else {
    res.render("login");
  }
}

module.exports = authMiddleware;
