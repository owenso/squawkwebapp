var User = require('mongoose').model('User'),
    passport = require('passport');


var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = "Username already exists";
                break;
            default:
                message = "Something went wrong.";
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message =
                err.errors[errName].message;
        }
    }
    return message;
};

// Disabled, server is not handling rendering


// exports.renderSignin = function(req, res, next) {
//     if (!req.user) {
//         res.render('signin', {
//             title: 'Sign-in Form',
//             messages: req.flash('error') || req.flash('info')
//         });
//     } else {
//         return res.redirect('/');
//     }
// };
// exports.renderSignup = function(req, res, next) {
//     if (!req.user) {
//         res.render('signup', {
//             title: 'Sign-up Form',
//             messages: req.flash('error')
//         });
//     } else {
//         return res.redirect('/');
//     }
// };





// Former web signup, disabled because of angular
// exports.signup = function(req, res, next) {
//     if (!req.user) {
//         var user = new User(req.body);
//         var message = null;
//         user.provider = 'local';
//         user.save(function(err) {
//             if (err) {
//                 console.log(err);
//                 var message = getErrorMessage(err);
//                 req.flash('error', message);
//                 return res.redirect('/signup');
//             }
//             req.login(user, function(err) {
//                 if (err) return next(err);
//                 return res.redirect('/');
//             });
//         });
//     } else {
//         return res.redirect('/');
//     }
// };

exports.signup = function(req, res, next) {
    var user = new User(req.body);
    var message = null;
    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            console.log(err);
            var message = getErrorMessage(err);
            console.log(message);
            return res.status(500).send(message);
        }
        req.login(user, function(err) {
            if (err) return next(err);
            return res.json(user);
        });
    });
};

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
    User.findOne({
        _id: id
    }, function(err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.uniqueCheck = function(req,res,next) {
    User.findOne( { $or:[ {'username':req.body.username}, {'email':req.body.email} ]}, function(err, user) {
        if(user){
            if(user.email== req.body.email && user.username == req.body.username){
                res.send('An account already exists with that username and email.');
            }
            else if(user.email == req.body.email){
                res.send('An account already exists with that email address.');
            }
            else if(user.username == req.body.username){
                res.send('Sorry, that username is taken.');
            }
        }
        else{
            res.send(false);
        }
    });
};

exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, {
        new: true
    }, function(err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    });
};



//need to check
exports.saveOAuthUserProfile = function(req, profile, done) {
	User.findOne({
		provider: profile.provider, 
		providerId: profile.providerId
	}, function(err, user) {
		if(err) {
			return done (err);
		} else {
			if (!user) {
				var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0]: '');

				User.findUniqueUsername(possibleUsername, null, function(avaliableUsername) {
						profile.username = avaliableUsername;
						user = new User(profile);

						user.save(function(err) {
							if (err) {
								var message = _this.getErrorMessage(err);

								req.flash('error', message);
								return res.redirect('/signup');
							}

							return done(err, user);
						});
				});
			} else{
				return done(err, user);
			}
		}
	});
};
