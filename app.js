var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

const { spawn } = require('child_process');
var ledapi = spawn('sudo', ['python3','ledapi.py',  '--brightness', '255','-c']);

ledapi.stdin.setEncoding('utf-8');
ledapi.stdout.pipe(process.stdout);

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/ledapi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter(ledapi));

app.use(bodyParser.text({ type: 'text/*' }))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ledapi.kill('SIGINT');
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

module.exports = app;
