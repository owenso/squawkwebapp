var requests = require('../../app/controllers/requests.server.controller');

module.exports = function(app) {
    app.route('/api/v1/requests')
        .post(requests.createNewRequest);

    app.route('/api/v1/avaliableRequests/')
    		.get(requests.findRequestByKnownLanguage);
};
