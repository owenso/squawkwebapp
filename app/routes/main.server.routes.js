module.exports = function(app) {
    var main = require('../controllers/main.server.controller');

    function isMainAuthenticated(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        } else if (req.user.knownLang === undefined) {
            res.redirect('/#/signup2');
        } else if (req.user) {
            return next();
        }
    }
    app.get('/main', isMainAuthenticated, main.render);
};
