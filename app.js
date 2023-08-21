const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const compression = require("compression");
const helmet = require("helmet");
const passport = require("passport");
require('./config/passport');
require('dotenv').config();

//Routers
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo')
const utilityFunction = require('./controllers/utilityFunctions');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet.contentSecurityPolicy({
  directives: {
    "style-src": ["'self'", "fonts.googleapis.com"],
    "font-src": ["'self'", "fonts.gstatic.com"],
    "img-src": ["'self'", "https://federicaercole.com"]
  },
}),);
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET_KEY,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));
app.use(flash());
app.use(utilityFunction.showMessage);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/todo', utilityFunction.isAuth, utilityFunction.getAllCategories, todoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: "Error 404 - Page Not Found" });
});

module.exports = app;
