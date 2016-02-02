var requests = require('../../app/controllers/requests.server.controller');
var root = '/api/v1/';
var authenticator = require('../../app/controllers/authenticator.server.controller');

module.exports = function(app) {
    app.route(root + 'request')
        .post(authenticator.getCurrent, requests.createNewRequest);

    app.route(root + 'request/:requestId')
    		.get(authenticator.check, requests.showRequest)
    		.put(authenticator.check, requests.updateRequest);

    app.route(root + 'availableRequests/')
    		.get(authenticator.getCurrent, requests.findRequestByKnownLanguage);

};
