module.exports = function(app) {
    var index = require('../controllers/index.server.controller');

    function isIndexAuthenticated(req, res, next) {
        //need to handle redirect to signup2
        if (req.user) {
            res.redirect('/main/');
        } else {
            return next();
        }
    }
    app.get('/', isIndexAuthenticated, index.render);
};
