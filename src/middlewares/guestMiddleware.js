function guestMiddleware(req, res, next) {
  if (!req.session.usuarioLogueado) {
    //uso el falsy como condicional
    next();
  } else {
    //Completar con un render enviando info del usuarioLogueado
    res.send("Esta páquina es solo para invitados");
  }
}

module.export = guestMiddleware;
