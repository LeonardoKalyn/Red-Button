var http = require('http');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];
var app = require('./config/express')(config);
require('./config/database')(app, config);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server is running in port localhost:%d', app.get('port'));
});
