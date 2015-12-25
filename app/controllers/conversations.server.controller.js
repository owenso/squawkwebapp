var Conversation = require('mongoose').model('Conversation');
var Message = require('mongoose').model('Message');

exports.createNewRequest = function(req, res, next) {
    var message = new Message(req.body);

    message.save(function(err) {
        if (err) {
            return next(err);
        } else {
            var newRequest = {
                authorId: message.authorId,
                requestId: message._id,
                language: req.user.learnLang[0] //need to set this on client side if we want to let them choose
            };
            var conversation = new Conversation(newRequest);

            conversation.save(function(err) {
                if (err) {
                    return next(err);
                } else {
                    console.log(conversation);
                }
            });

        }
    });
};

exports.findRequestByKnownLanguage = function(req, res, next) {
    console.log(req.user.knownLang);
    Conversation.find({
            language: {
                $in: req.user.knownLang
            }
        })
    		.populate('authorId')
        .deepPopulate('requestId.authorId messageResponseIds.authorId')
        .exec(function(err, data) {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                res.json(data);
            }
        });
};
