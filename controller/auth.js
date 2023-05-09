// Check user authentication
exports.checkAuthentication = (req, res, next) => {
  console.log("auth:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else return res.redirect("/user/signup");
};

// set user if user is authenticated
exports.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
