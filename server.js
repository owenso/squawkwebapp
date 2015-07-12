var express = require('express');
var app = express();



app.use('/a', function (request, response, next){
  
  response.send('Hi GUYS!');
});

app.listen(3000);

console.log('Server running at port 3000');

app.use(express.static('public'));

module.exports = app;