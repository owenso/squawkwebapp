var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

        
var MessageSchema = new Schema({
    author: String,
    filetype: String,
    url: String,
    created: {
        type: Date,
        default: Date.now
    },
    title:String,
    description: String,
    audioLength: String
});


mongoose.model('Message', MessageSchema);
