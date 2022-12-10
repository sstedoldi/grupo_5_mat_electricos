function guestMiddleware(req, res, next) {
  if (!req.session.user) {
    //uso el falsy como condicional
    next();
  } else {
    //**Completar con un render enviando info del user
    res.send("Esta página es solo para invitados");
  }
}

module.exports = guestMiddleware;
