var Conversation = require('mongoose').model('Conversation');

exports.createNewRequest = function (req, res, next){
    var conversation = new Conversation(req.body);

    conversation.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(conversation);
        }
    });
};