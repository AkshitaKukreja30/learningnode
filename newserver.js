const express        = require('express');
const bodyParser     = require('body-parser'); //extracts the entire body portion of an incoming request stream and exposes it on req.body .

var routes = require('./routes');


var port = 1515;

var app =express();

app.use(bodyParser.urlencoded());
app.get('/', function (req, res) {
   res.send('Hello Akshita! Hurry up');
});
app.listen(port,() => {
	console.log('see you on '+ port);

});

app.use('/', routes.api(app));
