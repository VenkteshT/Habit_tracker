const router = require("express").Router();
const homeController = require("../controller/home");
const authController = require("../controller/auth");
router.get("/", authController.checkAuthentication, homeController.home);
router.use("/user", require("./user"));
module.exports = router;
