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
                message: message._id,
                language: req.user.targetLanguages[0] //this just uses the first language in the user's array. need to set this on client side if we want to let them choose
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
                            requests: request._id
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


exports.findRequestByKnownLanguage = function(req, res, next) {
        console.log(req.cookies);
        console.log(req.session);
    console.log(req.user.nativeLanguages);
    Request.find({
            language: {
                $in: req.user.nativeLanguages
            }
        })
        .deepPopulate('message.authorId')
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

exports.updateRequest = function(req,res,next) {
    Request.findByIdAndUpdate(req.user.params, req.body, {
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
