exports.render = function(req, res) {

    res.render('main', {
        title: 'Sqawker',
        user: req.user
    });
};
