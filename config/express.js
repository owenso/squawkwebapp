var config = require('./config'),
	express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(session);

module.exports = function(db) {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
    	console.log("Running in development mode!");
    	app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
    	console.log("Running in production mode!");
    	app.use(compress());
    } else if (process.env.NODE_ENV === 'staging') {
        console.log("Running in staging mode!");
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
    	extended:true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
    	saveUninitialized: true,
    	resave: true,
    	secret: config.sessionSecret,
        store: new MongoStore({
        mongooseConnection: db.connection
    })
    }));

    app.set('views', './app/views');
    app.set('view engine', 'jade');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/main.server.routes.js')(app);

    app.use(express.static('./public'));

    return app;
};
