exports.render = function(req, res) {
		var urlRoot = require('../../config/config');
    res.render('main', {
        userImg: req.user.userImg,
        root: urlRoot.urlRoot
        //user: JSON.stringify(req.user._id),
    });

};
