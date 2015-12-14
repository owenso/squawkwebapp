module.exports = function(app){
	var main = require('../controllers/main.server.controller');
	// app.get('/main/', main.render);

	  function isAuthenticated(req, res, next) {
    if (req.user)
        return next();
    res.redirect('/');
}
  app.get('/main', isAuthenticated, main.render);
};