const Async = require("../util/Async");
const AppError = require("../util/AppError");
const User = require("../model/user");
const Habit = require("../model/habbit");

// date to string function
function getTodayDate() {
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let today = day + "/" + month + "/" + year;
  return today;
}

// create Habit
exports.createHabit = Async(async (req, res, next) => {
  // find user
  const user = await User.findById(req.user._id).populate();
  //find habit
  const habit = await Habit.findOne({
    content: req.body.habit,
    userRef: req.user._id,
  }).populate();
  //alredy exist ? dont add : add
  if (habit) return next(new AppError("Habit already exist", 400));
  let habits = await Habit.create({
    content: req.body.habit,
    userRef: req.user._id,
    dates: { date: await getTodayDate(), complete: "none" },
  });
  habits.save();

  req.flash("success", "new Habit Added");
  res.redirect("/");
});

// toggle Habit from favourites
exports.favoriteHabit = Async(async (req, res, next) => {
  let id = req.query.id;
  let userId = req.user._id;
  const habit = await Habit.findById(id);
  habit.favorite = habit.favorite ? false : true;
  req.flash(
    "success",
    habit.favorite ? "Added to Favourite" : "removed from favourite"
  );
  habit.save();
  res.redirect("/");
});

// Delete Habit
exports.destroyHabit = Async(async (req, res, next) => {
  const { id } = req.params;
  await Habit.findOneAndDelete(id);
  req.flash("success", "Habit Deleted ");
  res.redirect("/");
});

//  update Status of an Habit
exports.statusUpdate = Async(async (req, res, next) => {
  req.flash("success", "updated habit successfully");
  let d = req.query.date;
  let id = req.query.id;

  const habit = await Habit.findById(id);
  let dates = habit.dates;
  let found = false;
  dates.find((item, i) => {
    if (item.date === d) {
      if (item.complete === "yes") {
        item.complete = "no";
      } else if (item.complete === "no") {
        item.complete = "none";
      } else if (item.complete === "none") {
        item.complete = "yes";
      }
      found = true;
    }
  });

  if (!found) dates.push({ date: d, complete: "yes" });
  habit.dates = dates;
  habit.save();
  res.redirect("back");
});
