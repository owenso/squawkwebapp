var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

        
var ConversationSchema = new Schema({
    authorId: String,
    requestId: String,
    created: {
        type: Date,
        default: Date.now
    },
    messageResponseIds: [],
    status: {
        completed: {type:Boolean, default: false},
        answered: {type:Boolean, default: false},
        pending: {type:Boolean, default: true}
    },
    language: String
});


mongoose.model('Conversation', ConversationSchema);
