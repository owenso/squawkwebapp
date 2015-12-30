var conversations = require('../../app/controllers/conversations.server.controller');

module.exports = function(app) {
    app.route('/api/requests')
        .post(conversations.createNewRequest)
        .get(conversations.getUserRequests);

    app.route('/api/avaliableRequests/')
    		.get(conversations.findRequestByKnownLanguage);
};
