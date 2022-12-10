function userLoggedMiddleware(req, res, next) {
  res.locals.isAnUserLogged = false;
  if (req.session.user != undefined) {
    res.locals.isAnUserLogged = true;
    res.locals.user = req.session.user;
    if (res.locals.user.email == "admin@admin.com") {
      res.locals.adminLogged = true;
    }
  }
  //console.log (res.locals.user);
  next();
}

module.exports = userLoggedMiddleware;
