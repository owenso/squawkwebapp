var messages = require('../../app/controllers/messages.server.controller');
var aws = require('../../app/controllers/aws.server.controller');

module.exports = function(app) {
   	app.route('/signing')
   			.post(aws.s3Signing);

};
