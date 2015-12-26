exports.render = function(req, res) {
    // Express-session middleware adds session object to request. 
    // This checks the session object for the lastVisit property, logs it if found, 
    // and then gives it a new value of the current date.

    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();

    res.render('index', {
        userId: JSON.stringify(req.user._id)
    });
};
