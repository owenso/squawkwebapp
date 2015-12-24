module.exports = function(app) {
    var index = require('../controllers/index.server.controller');

    function isIndexAuthenticated(req, res, next) {
        if (req.session.needLangs) {
            delete req.session.needLangs;
            return next();
        } else if (req.user) {
            res.redirect('/main/');
        } else {
            delete req.session.currentId;
            return next();
        }
    }
    app.get('/', isIndexAuthenticated, index.render);
};
