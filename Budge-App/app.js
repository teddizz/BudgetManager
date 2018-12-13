var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var passport = require('passport');

/***********************HANDLE BARS*********************************/
//Middle ware
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
//var localStrategy = require('passport-local').Strategy;

//routes
var routes = require('./routes/index');
var users = require('./routes/users');
//initialize app
var app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//setting up the public folder (static folder)
app.use(express.static(path.join(__dirname, 'public')));

//Express sesssion
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


//passport initialization
app.use(passport.initialize());
app.use(passport.session());


// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
///END OF EXPRESS Validator


//connect flash
app.use(flash());
/**Global messages for flash*/
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.username_taken_msg = req.flash('username_taken_msg');
    //for the use of passport
    res.locals.error = req.flash('error');
    next();
});


app.use('/', routes);
app.use('/users', users);

/**********************************Mongoose*/
var mongoose = require('mongoose');
//mongoose.connect('mongodb://172.22.0.2/BudgeDB', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/BudgeDB', {useNewUrlParser: true});
let db = mongoose.connection;


//check for succcessful connection
db.once('open', function(){
    console.log("Connected to mongoDB");
});

//check for db errors
db.on('error', function(err){
    console.log(err);
});


//Bring in mongodb Models
let User = require('./models/users');
/*****************************end of mongoose*/

//app.set('port', (process.env.PORT || 3000));
//app.listen(app.get('port'), function(){
//    console.log("Server started")
//});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/*******************************************************/


//
//var app = express();
//
//// this variable is passing the data from the front-end form to the back end
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
//app.use(bodyParser.json());
//
//
///**********************************Mongoose*/
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/BudgeNode', {useNewUrlParser: true});
//let db = mongoose.connection;
//
//
////check for succcessful connection
//db.once('open', function(){
//    console.log("Connected to mongoDB");
//});
//
////check for db errors
//db.on('error', function(err){
//    console.log(err);
//});
//
//
////Bring in mongodb Models
//let User = require('./models/users');
///*****************************end of mongoose*/
//
//// Express Validator
//app.use(expressValidator({
//  errorFormatter: function(param, msg, value) {
//      var namespace = param.split('.')
//      , root    = namespace.shift()
//      , formParam = root;
//
//    while(namespace.length) {
//      formParam += '[' + namespace.shift() + ']';
//    }
//    return {
//      param : formParam,
//      msg   : msg,
//      value : value
//    };
//  }
//}));
/////END OF EXPRESS Validator
//
//
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use(logger('dev'));
//
//
//
//app.use(flash());
///**Initialize passport*/
//app.use(passport.initialize());
//app.use(passport.session());
//
//
////Middleware
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//
//app.use(express.static(path.join(__dirname, 'public')));
//
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  next(createError(404));
//});
//
//// error handler
//app.use(function(err, req, res, next) {
//  // set locals, only providing error in development
//  res.locals.message = err.message;
//  res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//  // render the error page
//  res.status(err.status || 500);
//  res.render('error');
//});
//
//
//
///**Global messages for flash*/
//app.use(function(req,res,next){
//    res.locals.success_msg = req.flash('success_msg');
//    res.locals.error_msg = req.flash('error_msg');
//    //for the use of passport
//    res.locals.error = req.flash('error');
//    next();
//});

module.exports = app;
