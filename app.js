var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));

//plain bodyParser() is deprecated. Required to parse json from the request body.
app.use(bodyParser.json());

//register the todo api
require('./api.js')(app);

var port = 3763;

app.listen(port, function() {
  console.log('listening on port ', port);
});
