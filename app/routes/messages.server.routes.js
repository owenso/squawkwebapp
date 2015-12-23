var messages = require('../../app/controllers/messages.server.controller');

module.exports = function(app) {
    app.route('/api/upload')
        .post(messages.create);
};
