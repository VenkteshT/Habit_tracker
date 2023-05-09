const router = require("express").Router();
const authController = require("../controller/auth");
const habitController = require("../controller/habit");

router.post(
  "/create",
  authController.checkAuthentication,
  habitController.createHabit
);
router.get("/favorite-habit", habitController.favoriteHabit);
router.get("/remove", habitController.destroyHabit);
router.get("/status-update", habitController.statusUpdate);

module.exports = router;
