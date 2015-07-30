var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
require('dotenv').load();
var passport = require('passport');
require('./config/passport')(passport);
var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();
var http=require('http').Server(app);
var io=require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.broadcast.emit('chat entry','a user connected');


  socket.on('chat message', function(msg){
    console.log(msg);
    socket.broadcast.emit('chat message', msg);
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');

  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: '123456789qwes'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  if(!req.session.user){
    next();
  }
});

app.get('/auth/fb',
    passport.authenticate('facebook',{ scope: ['user_status'] }),
    function(req, res){
      // The request will be redirected to Facebook for authentication, so this
      // function will not be called.
    });

app.get('/auth/fb/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/me');
    });

app.use('/',routes);
app.use('/users', users);

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

http.listen(8000, function(){
  console.log('listening on *:8000');

});

module.exports = app;
