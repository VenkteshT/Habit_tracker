const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");

// local strategy options
const opts = {
  usernameField: "email",
};

// callback function for local startegy
const cb = async (email, password, done) => {
  // find the user and establish identitiy
  try {
    const user = await User.findOne({ email });
    if (!user || password != user.password)
      throw new Error(!user ? "User not found" : "password mismatch");
    return done(null, user);
  } catch (err) {
    console.log("found error in passport js file:", err);
    return done(err);
  }
};

// local strategy
passport.use(new LocalStrategy(opts, cb));

//set user cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// extract from cookie
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log("foudn error in passport js file:", err);
    done(err);
  }
});

module.exports = passport;
