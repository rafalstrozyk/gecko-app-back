const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database/index');

const app = express();
app.use(cors());
const indexRouter = require('./routes/index');
const geckoRouter = require('./routes/gecko');
const eatingRouter = require('./routes/eating');
const uploadRouter = require('./routes/upload');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// app.options('*', cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')));


db.once('open', () => {
  console.log('Database connected!');
});

db.on('error', (err) => {
  console.error('connection error:', err);
});

app.use('/', indexRouter);
app.use('/gecko', geckoRouter);
app.use('/eating', eatingRouter);
app.use('/upload', uploadRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
