exports.render = function(req, res) {
    // Express-session middleware adds session object to request.
    // This checks the session object for the lastVisit property, logs it if found,
    // and then gives it a new value of the current date.

    // if (req.session.lastVisit) {
    //     console.log(req.session.lastVisit);
    // }
    // req.session.lastVisit = new Date();
    var urlRoot = require('../../config/config');
    // var userId;
    // if (req.user) {
    //     userId = JSON.stringify(req.user._id);
    // } else {
    //     userId = 'null';
    // }
    res.render('index', {
        root: urlRoot.urlRoot,
        //user: userId
    });
};
