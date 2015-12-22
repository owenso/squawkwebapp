var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

        
var ConversationSchema = new Schema({
    author: String,
    title: String,
    request: String,
    created: {
        type: Date,
        default: Date.now
    },
    messages: [],
    status: {
        completed: {type:Boolean, default: false},
        answered: {type:Boolean, default: false},
        pending: {type:Boolean, default: true}
    },
    language: String
});


mongoose.model('Conversation', ConversationSchema);
