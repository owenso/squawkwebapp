module.exports = function(app){
	var index = require('../controllers/index.server.controller');
	// app.get('/', index.render);

    function isIndexAuthenticated(req, res, next) {
        if (!req.user) {
						return next();
        } else if (req.user.knownLang === undefined) {
            res.redirect('/#/signup2');
        } else if (req.user) {
            res.redirect('/main/');
        }
    }
    app.get('/', isIndexAuthenticated, index.render);
};