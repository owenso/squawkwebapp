var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate')(mongoose);



var ConversationSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    requestId: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    created: {
        type: Date,
        default: Date.now
    },
    messageResponseIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    status: {
        completed: {
            type: Boolean,
            default: false
        },
        answered: {
            type: Boolean,
            default: false
        },
        pending: {
            type: Boolean,
            default: true
        }
    },
    language: String
});

ConversationSchema.plugin(deepPopulate);

mongoose.model('Conversation', ConversationSchema);
