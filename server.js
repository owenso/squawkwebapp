process.env.NODE_ENV = process.env.NODE_ENV || 'local';

var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');

var db = mongoose();
var app = express(db);
var passport = passport();

var port = process.env.PORT || 3000;


app.listen(port);
module.exports = app;

console.log('Server running at port:' + port);
