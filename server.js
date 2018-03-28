
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();

var url = "mongodb://localhost:27017/mydb";
const port = 1515;
app.use(bodyParser.urlencoded({ extended: true }));
// app.listen(port, () => {
//   console.log('See you on ' + port);
//   //res.writeHead(200, {'Content-Type': 'text/html'});
//   //res.end('Hello World!');
// });
var http = require('http');
var db = require('./config/db');
// http.createServer(function (req, res) {
// 	console.log('See you on' + port)
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('Hello World!');
    
// }).listen(port);




//require('./routes')(app, {});

MongoClient.connect(db.url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db = db.db("mydb")
  db.createCollection("names", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  require('./routes')(app, db);
 
 app.get('/', function (req, res) {
   res.send('Hello Akshita! Hurry up');
});
app.listen(port,() => {
	console.log('see you on '+ port);

});
  // db.close();
});
});
