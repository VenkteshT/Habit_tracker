const Async = require("../util/Async");
const User = require("../model/user");
const Habit = require("../model/habbit");

// get next seven date of week
function getOneWeekDate() {
  let arr = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    let mm = d.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;
    let dd = d.getDate();
    if (dd < 10) dd = "0" + dd;
    const yyyy = d.getFullYear();
    arr.push(dd + "/" + mm + "/" + yyyy);
  }
  return arr;
}

exports.home = Async(async (req, res, next) => {
  if (!req.user) return res.redirect("/user/signin");

  let habits = await Habit.find({ userRef: req.user._id });
  console.log("habitts:", habits);
  return res.render("home", {
    title: "Habbit tracker app",
    habits,
    weeklyDate: await getOneWeekDate(),
  });
});
