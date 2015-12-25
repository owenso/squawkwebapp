var messages = require('../../app/controllers/messages.server.controller');

module.exports = function(app) {
    app.route('/api/newRequest')
        .post(messages.createNewRequest);

   	app.route('/signing')
   			.post(messages.s3Signing);

};
