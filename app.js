require('dotenv').config(); // Load environment variables

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

const app = express();

// MongoDB connection
mongoose.connect(process.env.MD_URL)
  .then(() => console.log("MongoDB connection success ✅"))
  .catch((error) => console.error("MongoDB connection error ❌", error));

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/index', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/user'));
app.use('/category', require('./routes/category'));
app.use('/product', require('./routes/product')); // 💡 product image upload with Cloudinary works here
app.use('/order', require('./routes/order'));
app.use('/payment', require('./routes/payment'));
app.use('/viewOrder', require('./routes/viewOrder'));
app.use('/review', require('./routes/review'));

// Catch 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
