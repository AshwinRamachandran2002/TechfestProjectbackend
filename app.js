var createError = require('http-errors');//to detect http errors
var express = require('express');//express module
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
//var catalogRouter = require('./routes/collections');  //Import routes for "catalog" area of site
const Thing = require('./models/empdetails');

var compression = require('compression');
var helmet = require('helmet');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', express.static('./public'));
// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://sam:sam@cluster0.gvndy.mongodb.net/Danaherdashboard?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;

//var mongoDB= process.env.dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//db.collection('assigned')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression()); // Compress all routes

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//use this when we navigate in /


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;
