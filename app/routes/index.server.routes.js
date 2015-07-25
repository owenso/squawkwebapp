module.exports = function(app){
	var index = require('../controllers/index.server.controller');
	app.get('/', index.render);

	// When we hit the root route, a method on the index controller will
	// be run, which will render a template on the browser page
};