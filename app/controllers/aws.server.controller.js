var Message = require('mongoose').model('Message');
var creds = require('../../config/config');
var crypto = require('crypto');
var moment = require('../../public/lib/momentjs/moment.js');
var uuid = require('node-uuid');

//var s3Url = 'https://' + creds.aws.bucket + '.s3-' + creds.aws.region + '.amazonaws.com';
var s3Url = 'https://s3.amazonaws.com/'+ creds.aws.bucket;



exports.s3Signing = function(req, res) {
	var request = req.body;
    var fileName = uuid.v4()+'.'+ request.filetype;
    var kind = request.type.split('/').shift();

    var path = 'uploads' + '/' + request.userId + '/' + kind + '/' + fileName;
    
    var readType = 'public-read';
    var expiration = moment().add(15, 'm').toDate(); //15 minutes


    var s3Policy = {
        'expiration': expiration,
        'conditions': [{
                'bucket': creds.aws.bucket
            },
            ['starts-with', '$key', path], 
            {
                'acl': readType
            },
            {
              'success_action_status': '201'
            },
            ['starts-with', '$Content-Type', request.type],
            ['content-length-range', 2048, 10485760], //min and max
        ]
    };
    var stringPolicy = JSON.stringify(s3Policy);
    var base64Policy = new Buffer(stringPolicy, 'utf-8').toString('base64');

    // sign policy
    var signature = crypto.createHmac('sha1', creds.aws.secretAccessKey)
        .update(new Buffer(base64Policy, 'utf-8')).digest('base64');

    var credentials = {
        url: s3Url,
        fields: {
            key: path,
            AWSAccessKeyId: creds.aws.accessKeyID,
            acl: readType,
            policy: base64Policy,
            signature: signature,
            'Content-Type': request.type,
            success_action_status: 201
        }
    };
    res.jsonp(credentials);
};
