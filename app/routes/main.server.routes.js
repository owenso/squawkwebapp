module.exports = function(app) {
    var main = require('../controllers/main.server.controller');

    function isMainAuthenticated(req, res, next) {

        //need to handle redirect to signup2
        if (!req.user) {
            res.redirect('/');
        } else {
            return next();
        }
    }
    app.get('/main', isMainAuthenticated, main.render);
};
