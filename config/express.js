var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
    	console.log("running in development mode");
    	app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
    	console.log("running in production mode");
    	app.use(compress());
    }

    app.use(bodyParser.urlencoded({
    	extended:true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    require('../app/routes/index.server.routes.js')(app);
    return app;
};
