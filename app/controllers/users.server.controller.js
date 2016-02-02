var User = require('mongoose').model('User'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/config');


var getErrorMessage = function(err) {
    var message = '';
    if (err.code) {
        if (err.code == 11000) {
            var field = err.errmsg.split(".$")[1];
            field = field.split(" dup key")[0];
            field = field.substring(0, field.lastIndexOf("_"));
            message = "An account with this " + field + " already exists.";
        } else {
            message = "Sorry! Something went wrong, please try again later.";
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message =
                err.errors[errName].message;
        }
    }
    return message;
};


exports.signup = function(req, res, next) {
    var user = new User(req.body);
    var message = null;
    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            var message = getErrorMessage(err);
            return res.status(500).send(message);
        }
        req.login(user, function(err) {
            if (err) return next(err);
            var token = jwt.sign(user, config.jwtSecret);
            return res.json({
                success: true,
                token: token
            });
            // return res.json(user);
        });
    });
};

exports.signout = function(req, res) {
    req.logOut();
    req.session.destroy();
    res.clearCookie('connect.sid', {
        path: '/'
    });
    res.redirect('/');
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

exports.getUser = function(req, res, next) {
    User.findOne({
        _id: req.params.userId
    }, function(err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.userWithRequests = function(req, res, next) {
    User.findOne({
            _id: req.user.id
        })
        .deepPopulate('requests.message filledRequests.message')
        .exec(function(err, data) {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                res.json(data);
            }
        });
};

exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, {
        new: true
    }, function(err, user) {
        if (err) {
            console.log(err);
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
exports.tokenSaveOAuthUserProfile = function(profile, done, req, res) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function(err, user) {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

                User.findUniqueUsername(possibleUsername, null, function(avaliableUsername) {
                    profile.username = avaliableUsername;
                    user = new User(profile);

                    user.save(function(err) {
                        if (err) {
                            var message = _this.getErrorMessage(err);

                            req.flash('error', message);
                            return res.redirect('/');
                        }

                        return done(err, user);
                    });
                });
            } else {
                return done(err, user);
            }
        }
    });
};

exports.localSignIn = function (req, res) {
    var token = jwt.sign(req.user.toObject(), config.jwtSecret);
    var tokenResponse = {
        success: true,
        token: token
    };
    if (req.user.nativeLanguages.length === 0 || req.user.targetLanguages.length === 0){
        tokenResponse.hasSelectedLanguages = false;
    } else {
        tokenResponse.hasSelectedLanguages = true;
    }
    res.status(200).json(tokenResponse);
};

exports.saveOAuthUserProfile = function(req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function(err, user) {
        if (err) {
            return done(err);
        } else {
            if (!user) {

              //have to revisit this

                var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

                User.findUniqueUsername(possibleUsername, null, function(avaliableUsername) {
                    profile.username = avaliableUsername;
                    user = new User(profile);

                    user.save(function(err) {
                        if (err) {
                            var message = _this.getErrorMessage(err);

                            req.flash('error', message);
                            return res.redirect('/');
                        }

                        return done(err, user);
                    });
                });
            } else {
                return done(err, user);
            }
        }
    });
};
