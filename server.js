var express = require('express');
var app = express();



app.use('/', function (request, response){
  response.send('Hi GUYS!');
});

app.listen(3000);

console.log('Server running at port 3000');




module.exports = app;