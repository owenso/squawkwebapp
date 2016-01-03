var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate')(mongoose);



var RequestSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    requestMessageId: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    created: {
        type: Date,
        default: Date.now
    },
    responseMessageIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    completed: {
        type: Boolean,
        default: false
    },
    pending: {
        type: Boolean,
        default: true
    },
    language: String
});

RequestSchema.plugin(deepPopulate);

mongoose.model('Request', RequestSchema);
