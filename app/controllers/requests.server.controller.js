var Request = require('mongoose').model('Request');
var Message = require('mongoose').model('Message');
var User = require('mongoose').model('User');


exports.createNewRequest = function(io){
    return function(req, res, next) {

    var messageObject = req.body;
    messageObject.authorId = req.user._id;
    var message = new Message(messageObject);

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
                    request.deepPopulate('message.authorId', function(error, socReq) {
                      console.log(socReq);
                      io.emit('newRequest', socReq);
                    });
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
};


exports.findRequestByKnownLanguage = function(req, res, next) {
    Request.find({
            language: {
                $in: req.user.nativeLanguages
            }
        })
        .deepPopulate('message.authorId')
        .sort({
            "created" : -1
        })
        .exec(function(err, data) {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                var responseObj = {
                  nativeLanguages : req.user.nativeLanguages,
                  requests : data
                };
                res.json(responseObj);
            }
        });
};

exports.showRequest = function(req, res, next) {
    Request.findOne({
        _id: req.params.requestId
    })
    .deepPopulate('message.authorId responses.authorId')
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
