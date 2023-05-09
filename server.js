const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const path = require("path");
const express = require("express");
const app = express();
const db = require("./config/mongoose");
const bodyParser = require("body-parser");
const index = require("./route/index");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const authController = require("./controller/auth");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join("./assets")));

// set up session cookie
app.use(
  session({
    name: "habbit tracker",
    secret: process.env.SESSION_SECRETE,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: process.env.DATABASE,
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err.message || "connect mongo error");
      }
    ),
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(authController.setAuthenticatedUser);

// flash middle ware
app.use(flash());
app.use(require("./config/flashMware").setFlash);
// Route
app.use("/", index);

// Error Handler
app.use(require("./controller/errorHanlder"));

// listening to server
const port = process.env.PORT || 9000;

app.listen(port, (err) => {
  if (err) {
    console.log("Error in connecting to server:", err.message);
    process.exit(1);
  }
  console.log("server started on port:", port);
});
