
/**
 * Module dependencies.
 */

/*
Developed by Arijit Chatterjee */


var application_root=__dirname;
var express = require('express')
  , routes = require('./routes')
  ,dtb=require('./routes/dtbase')
  , http = require('http')
  , path = require('path');
  

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.cookieParser());
app.use(express.session({secret:'my secret code'}));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html',require('ejs').__express);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/adduser',dtb.insertUser);
app.post('/addBook',dtb.insertBook);
app.post('/signup',dtb.insertAdmin);
app.post('/transaction',dtb.transaction);
app.post('/login',dtb.login);
app.get('/userList', dtb.showallusers);
app.get('/bookList', dtb.showallbooks);
app.delete('/removebook',dtb.removeBooks);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
