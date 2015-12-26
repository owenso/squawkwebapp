exports.render = function(req, res) {
		console.log(JSON.stringify(req.user._id));
    res.render('main', {
        userImg: req.user.userImg,
        user: JSON.stringify(req.user._id)
    });

};
