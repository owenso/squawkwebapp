var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

        
var MessageSchema = new Schema({
    author: ObjectId,
    filetype: String,
    url: String,
    created: {
        type: Date,
        default: Date.now
    },
    text: String,
    audioLength: String
});


mongoose.model('Message', MessageSchema);
