var jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');
var config = require('../../config/config');


var getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


exports.check = function(req, res, next) {
    var token = getToken(req.headers);
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
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }

};

exports.currentUserOrAdmin = function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.verify(token, config.jwtSecret);
        User.findOne({
            _id: decoded._id
        }, function(err, user) {
            if (err) throw err;

            if (user.role === 'Admin' || user._id == req.params.userId) {
                return next();
            } else {
                return res.status(401).send({
                    success: false,
                    msg: 'Authentication failed. Unauthorized User.'
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
};
