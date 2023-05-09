const Async = require("../util/Async");
const User = require("../model/user");
// sign up page
exports.signup = Async(async (req, res, next) => {
  res.render("sign_up", { title: "sign-up page" });
});

// sign in page
exports.signin = Async(async (req, res, next) => {
  res.render("sign_in", { title: "sign-in page" });
});

// create user
exports.create = Async(async (req, res, next) => {
  console.log("comed here");
  const { email, name, password, confirmpassword } = req.body;
  if (password != confirmpassword) {
    return res.redirect("back");
  }
  const user = await User.findOne({ email });
  if (!user) {
    const newUser = await User.create(req.body);
  }
  return res.redirect("/user/signin");
});

// create session / user sign in
exports.createSession = Async(async (req, res, next) => {
  req.flash("success", "Login Success");

  res.redirect("/");
});

exports.logOut = (req, res, next) => {
  req.logout(next);
  res.redirect("/user/signin");
};
