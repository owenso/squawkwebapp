var config = require('./config'),
		express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(session),
		http = require('http'),
		socketio = require('socket.io');



module.exports = function(db) {
    var app = express();

		var server = http.createServer(app);

		var io = socketio.listen(server);

    app.use(favicon('./public/img/favicons/favicon.ico'));

    if (process.env.NODE_ENV === 'development'){
			//for development server
    	console.log("Running in development mode!");
    	app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'local') {
			//for local server
			console.log("Running in local mode. ARE YOU HAPPY NOW, ANDY?!");
			app.use(morgan('dev'));
		} else if (process.env.NODE_ENV === 'production') {
			//for production server
    	console.log("Running in production mode!");
    	app.use(compress());
    } else if (process.env.NODE_ENV === 'staging') {
			//for staging server
        console.log("Running in staging mode!");
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
    	extended:true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(cookieParser());

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
    require('../app/routes/messages.server.routes.js')(app);
    require('../app/routes/conversation.server.routes.js')(app);
    require('../app/routes/requests.server.routes.js')(app, io);


    app.use(express.static('./public'));

    return server;
};
