module.exports = function(app) {
    var index = require('../controllers/index.server.controller');

    function isIndexAuthenticated(req, res, next) {
        if (req.user) {
            console.log('user found');
            if (req.user.knownLang === undefined) {
                console.log(req.user.knownLang);
                res.redirect('/#/signup2');
            } else {
                console.log('redirecting to main');
                res.redirect('/main/');
            }
        } else {
            console.log('user not found');
            return next();
        }
    }
    app.get('/', isIndexAuthenticated, index.render);
};
