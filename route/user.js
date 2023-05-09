const router = require("express").Router();
const userController = require("../controller/user");
const passport = require("passport");

//
router.use("/habit", require("./habit"));
// Read
router.get("/signup", userController.signup);
router.get("/signin", userController.signin);
router.get("/sign-out", userController.logOut);
//
router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/user/signin",
  }),
  userController.createSession
);

module.exports = router;
