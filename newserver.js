const express        = require('express');
const bodyParser     = require('body-parser');
const _               = require('lodash');

var { Employee } = require('./model/Employee');
var { mongoose } = require('./mongoose');
var {ObjectID} = require('mongodb');
var routes = require('./routes');


var port = 1515;

var app =express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
   res.send('Hello Akshita! Hurry up');
});
app.listen(port,() => {
	console.log('see you on '+ port);

});

app.use('/', routes.api(app));
