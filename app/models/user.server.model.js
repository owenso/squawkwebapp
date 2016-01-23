var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate')(mongoose);



//Possibly add: Last Logged in

//Note: validations are not case sensitive!!!
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        index: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    nativeLanguages: [],
    targetLanguages: [],
    userImg: {
        type: String,
        default: '/img/parakeet.png'
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: 'Username is required'
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password.length >= 6;
            },
            'Password should be longer.'
        ],
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'User',
        enum: ['Admin', 'Owner', 'User']
    },
    requests: [{
            type: Schema.Types.ObjectId, 
            ref: 'Request'
    }],
    filledRequests: [{
            type: Schema.Types.ObjectId, 
            ref: 'Request'
    }],
    conversations: [{
            type: Schema.Types.ObjectId, 
            ref: 'Conversation'
    }]
});

UserSchema.virtual('fullName').get(function() {
    if (this.firstName) {
        return this.firstName + ' ' + this.lastName;
    } else {
        return null;
    }
}).set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

UserSchema.plugin(deepPopulate);

mongoose.model('User', UserSchema);
