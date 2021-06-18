var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require("cors");
var logger = require('morgan');
const middlewares = require('./middlewares')
const dotenv = require('dotenv')
dotenv.config()


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const noticiasRouter = require('./routes/noticias')
const comentariosRouter = require('./routes/comentarios')
const contactoRouter = require('./routes/contacto')
const authRouter = require('./routes/auth')
const verifyRouter = require('./routes/verify')
const recuperarPassRouter = require('./routes/recuperacionPass')
//admin
const ANoticiasRouter = require('./routes/admin/noticias')
var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/noticias', noticiasRouter)
app.use('/comentarios',comentariosRouter )
app.use('/contacto', contactoRouter)
app.use('/auth', authRouter)
app.use('/verify', verifyRouter)
app.use('/recuperacionPass', recuperarPassRouter)
//admin
app.use('/admin/noticias',middlewares.securedAdmin, ANoticiasRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
