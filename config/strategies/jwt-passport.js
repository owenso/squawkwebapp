var JwtStrategy = require('passport-jwt').Strategy;
var passport = require('passport');
var User = require('mongoose').model('User');
var config = require('../config');
 
module.exports = function() {
  var opts = {};
  opts.secretOrKey = config.jwtSecret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};