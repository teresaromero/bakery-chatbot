require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");

const indexRouter = require("./routes/index");

const CronJob = require("cron").CronJob;
const axios = require("axios");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));

//Locals
app.locals.title = "Bakery Bot";
app.locals.daily = "hola pepe";

//Routes
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// console.log('Before job instantiation');
// const getDaily = new CronJob('00 08 20 * * 1-5', () => {
//   axios
//     .get(process.env.API)
//     .then(daily => {
//       console.log('Daily Recomendation Updated to ',daily.data);
//       app.locals.daily = daily.data;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
// console.log('After job instantiation');


// getDaily.start()

module.exports = app;
