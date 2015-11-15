var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db, function(err) {
        if (err)
            console.log("mongoose connection error: " + err);
        else
            console.log("mongoose connection successful");
    });

    require('../app/models/user.server.model');
    
    return db;
};
