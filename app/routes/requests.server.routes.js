var requests = require('../../app/controllers/requests.server.controller');
var root = '/api/v1/';

module.exports = function(app) {
    app.route(root + 'requests')
        .post(requests.createNewRequest);

    app.route(root + 'avaliableRequests/')
    		.get(requests.findRequestByKnownLanguage);
};
