
/**
 * Module dependencies.
 */

// initialize express engine and make routes to forward requests from '/' and '/main' to routes.index and routes.main each.
// listen socket connection using socket.js powered by socket.io.

var express = require('express')
  , routes = require('./routes')
  , socket = require('./socket');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'secret key'}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/main', routes.main);
app.get('/main', routes.main);

app.listen(3000, function(){
  console.log("* Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
socket.listen(app);

