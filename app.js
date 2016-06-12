var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session')
var RedisStore = require('connect-redis')(session);



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/aihang');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

var routes = require('./routes/index');
var users = require('./routes/users');
var geoconv = require('./routes/geoconv');
var hotelRouter = require('./routes/hotelRouter');
var orderRouter = require('./routes/orderRouter');

var app = express();

var corsOptions = {
  credentials: true,
  origin:[
   'http://localhost:8100',
   ],
};
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
    store: new RedisStore({host:'127.0.0.1', port:'6379'}),
    resave: true,
    path:'/',
    saveUninitialized: true,
    name:'hybird',
    secret: 'hybird app',
    cookie:{
      maxAge:60 * 1000 * 60 * 24 * 30 // 1 hour * 24 * 30
    }
}));

app.use(function (req, res, next) {
  if (!req.session) {
    console.log('session is not exist');
    return next(new Error('oh no')) // handle error
  }
  next() // otherwise continue
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/geoconv', geoconv);
app.use('/hotels', hotelRouter);
app.use('/orders', orderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
