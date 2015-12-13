module.exports = function(app){
	var main = require('../controllers/main.server.controller');
	app.get('/main/', main.render);
};