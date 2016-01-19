var Request = require('mongoose').model('Request');
var Message = require('mongoose').model('Message');
var User = require('mongoose').model('User');

exports.createNewRequest = function(req, res, next) {
    var message = new Message(req.body);

    message.save(function(err) {
        if (err) {
            return next(err);
        } else {
            var newRequest = {
                authorId: message.authorId,
                requestMessageId: message._id,
                language: req.user.learnLang[0] //need to set this on client side if we want to let them choose
            };
            var request = new Request(newRequest);

            request.save(function(err) {
                if (err) {
                    res.status(500);
                    return next(err);
                } else {
                    console.log(request);
                    User.update({
                        _id: req.user._id
                    }, {
                        $push: {
                            createdRequestIds: request._id
                        }
                    }, function(err, numAffected) {
                        if (err) {return res.send(500, { error: err });}
                        return res.send("succesfully saved");
                    });
                }
            });

        }
    });
};

exports.list = function (req,res,next) {
    Request.find({})
        .populate('authorId requestMessageId')
        .deepPopulate('responseMessageIds.authorId')
        .sort({
            created: -1
        })
        .exec(function(err, data) {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                res.json(data);
            }
        });
};

exports.findRequestByKnownLanguage = function(req, res, next) {
    console.log(req.user.knownLang);
    Request.find({
            language: {
                $in: req.user.knownLang
            }
        })
        .populate('authorId requestMessageId')
        .deepPopulate('responseMessageIds.authorId')
        .sort({
            created: -1
        })
        .exec(function(err, data) {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                res.json(data);
            }
        });
};
