var requests = require('../../app/controllers/requests.server.controller');

module.exports = function(app) {
    app.route('/api/requests')
        .post(requests.createNewRequest);

    app.route('/api/avaliableRequests/')
    		.get(requests.findRequestByKnownLanguage);
};
