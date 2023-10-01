var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/index");
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
	session({
		secret: "hahaha", // Change this to a secure secret
		resave: false,
		saveUninitialized: true,
	})
);
app.use((req, res, next) => {
	res.header(
		"Cache-Control",
		"no-store, private, max-age=0, no-cache, must-revalidate"
	);
	next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
//app.use('/users', usersRouter);

module.exports = app;