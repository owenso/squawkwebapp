var Message = require('mongoose').model('Message');

exports.create = function (req, res, next){
    var message = new Message(req.body);

    message.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(message);
        }
    });
};
