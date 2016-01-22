var requests = require('../../app/controllers/requests.server.controller');
var root = '/api/v1/';
var authenticator = require('../../app/controllers/authenticator.server.controller');

module.exports = function(app) {
    app.route(root + 'requests')
        .post(requests.createNewRequest);

    app.route(root + 'availableRequests/')
    		.get(authenticator.getCurrent, requests.findRequestByKnownLanguage);
};
