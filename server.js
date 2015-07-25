var express = require('./config/express');
var app = express();

app.listen(3000);
module.exports = app;

console.log('Server running at port 3000');



