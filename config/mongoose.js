var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db, function(err) {
        if (err){
            console.log("error connecting to mongolabs: " + err);
          	mongoose.connect('mongodb://localhost/squawker', function(err){
          		if (err){
          			console.log('error connecting to local fallback: ' + err);
          		} else{
          			console.log('mongoose connected to local fallback');
          		}
          });
          }
        else {
            console.log("mongoose connection to mongolabs successful");
        }
    });

    require('../app/models/user.server.model');
    
    return db;
};
