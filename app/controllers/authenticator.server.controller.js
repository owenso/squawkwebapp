var jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');
var config = require('../../config/config');




exports.check = function(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        var decoded = jwt.verify(token, config.jwtSecret);
        User.findOne({
            _id: decoded._id
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                return next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            msg: 'No token provided.'
        });
    }

};

exports.currentUserOrAdmin = function(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        var decoded = jwt.verify(token, config.jwtSecret);
        User.findOne({
            _id: decoded._id
        }, function(err, user) {
            if (err) throw err;

            if (user.role === 'Admin' || user._id == req.params.userId) {
                return next();
            } else {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. Unauthorized User.'
                });
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            msg: 'No token provided.'
        });
    }
};

exports.getCurrent = function(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        var decoded = jwt.verify(token, config.jwtSecret);
        User.findOne({
            _id: decoded._id
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                req.user = user;
                return next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            msg: 'No token provided.'
        });
    }
};
