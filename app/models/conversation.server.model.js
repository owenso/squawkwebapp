var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

        
var ConversationSchema = new Schema({
    author: ObjectId,
    title: String,
    request: ObjectId,
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

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Conversation', ConversationSchema);
