var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user')
var categoryRouter = require('./routes/category')
var productRouter = require('./routes/product')
var orderRouter = require('./routes/order')
var paymentRouter = require('./routes/payment')
var reviewRouter = require('./routes/review')
var viewOrderRouter = require('./routes/viewOrder')
var mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/mongoose')
// mongoose.connect('mongodb://0.0.0.0:27017/projact')
mongoose.connect(process.env.MD_URL)
  .then(() => {
    console.log("connection success");

  })
  .catch((error) => {
    console.log(error);

  })
var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/', userRouter);
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)
app.use('/payment', paymentRouter)
app.use('/viewOrder', viewOrderRouter)
app.use('/review', reviewRouter)


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
  res.render('error');
});

module.exports = app;
