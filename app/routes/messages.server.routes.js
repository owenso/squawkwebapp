var messages = require('../../app/controllers/messages.server.controller');

module.exports = function(app) {
   	app.route('/signing')
   			.post(messages.s3Signing);

};
