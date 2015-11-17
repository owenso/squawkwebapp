var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db, function(err) {
        if (err)
            console.log("mongoose connection error: " + err);
        else
        	var mongoServerLoc = '';
        		if (config.db.indexOf('mongolab') == -1){
        			mongoServerLoc = 'local';
        		} else{
        			mongoServerLoc = 'mongolabs'
        		}

            console.log("mongoose connection successful: running on " + mongoServerLoc);
    });

    require('../app/models/user.server.model');
    
    return db;
};
