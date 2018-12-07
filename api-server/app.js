var createError = require('http-errors');
var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const socketIO = require('socket.io');
var app = express();
var server = http.createServer();
server.listen(3100)
var io = socketIO(server);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.emit('videostart',generateMessage('admin', 'Welcome to the App'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user found'));
  socket.on('createMessage', (data) => {
      io.emit('newMessage', generateMessage(data.from, data.data) );

      // socket.broadcast.emit('newMessage', {
      //     from: data.from,
      //     data: data.data,
      //     createdAt: new Date().getTime()
      // })
  });
});
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
