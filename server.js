var express = require('express'); //grab the express module we downloaded

var app = express(); //actually create an express app. We'll use this to configure the server.





app.use(express.static('public'));

var port = 4000;



app.listen(port, function() {
  console.log('app listening on port 4000.')
});
