var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate')(mongoose);



var ConversationSchema = new Schema({
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
    messageResponseIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    completed: {
        type: Boolean,
        default: false
    },
    language: String
});

ConversationSchema.plugin(deepPopulate);

mongoose.model('Conversation', ConversationSchema);
